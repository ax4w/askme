<script lang="ts">
    import type { Message } from './message';
    import type { Model } from '$lib/models';
	import Markdown from 'svelte-exmarkdown';
    import { goto } from "$app/navigation";
	import { onMount } from 'svelte';
    let inputValue = $state('');
    let inputHeight = $state(24);
    let isLoading = $state(false);
    let selectedModel = $state('gemini-2.0-flash');
    let messages = $state<Message[]>([]);
    
    let availableModels = $state<Model[]>([]);

    onMount(() => {
        getAvailableModels()
    })

    function getAvailableModels() {
        fetch('/models')
            .then(response => response.json())
            .then(data => {
                availableModels = data;
            })  
    }
    
    function adjustTextareaHeight(event: Event): void {
        const textarea = event.target as HTMLTextAreaElement;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.max(24, Math.min(64, textarea.scrollHeight))}px`;
    }
    
    function handleKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            if (!event.shiftKey) {
                event.preventDefault();
                if (inputValue.trim()) {
                    sendMessage();
                }
            }
        }
    }
    
    function sendMessage(): void {
        if (inputValue.trim()) {
            isLoading = true;
            const userMessage = inputValue;
            
            messages.push({
                content: userMessage,
                author: 'user',
                timestamp: new Date().toISOString()
            });
        
            fetch(`/chat?message=${encodeURIComponent(userMessage)}&model=${selectedModel}`)
                .then(response => {
                    if (response.status == 401) {
                        goto('/');
                    }
                   return response.json()
                })
                .then(data => {
                    messages.push(data);
                    setTimeout(() => {
                        const container = document.querySelector('.terminal-content-area');
                        if (container) container.scrollTop = container.scrollHeight;
                    }, 0);
                    isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching response:', error);
                    isLoading = false;
                });
                
            inputValue = '';
            inputHeight = 24;
        }
    }
</script>

<div class="h-screen flex items-center justify-center">
    <div class="mockup-code w-3/4 max-w-3xl relative flex flex-col h-[600px]">
        <div class="absolute top-0 left-0 w-full bg-base-300 flex items-center p-3 z-20 rounded-t-xl">
            <div class="flex gap-1">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="flex-grow"></div>
            <div class="relative">
                <select 
                    bind:value={selectedModel}
                    class="custom-select"
                >
                    {#each availableModels as model}
                        <option value={model.id}>{model.name}</option>
                    {/each}
                </select>
            </div>
        </div>
        
        <div class="terminal-content-area overflow-y-auto scrollbar-hide pt-10 pb-16 flex-grow">
            {#each messages as message}
                <div class="terminal-message">
                    <div class="flex">
                        {#if message.author === 'user'} 
                            <div class="text-green-500 w-6 flex-shrink-0 text-center">$</div>
                        {:else}
                            <div class="text-blue-500 w-6 flex-shrink-0 text-center tooltip tooltip-right" data-tip={message.model || selectedModel}>@</div>
                        {/if}
                        <div class="terminal-content">
                            <div class="whitespace-pre-wrap break-words">
                                <Markdown md={message.content} />
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
            {#if isLoading}
                <div class="terminal-message">
                    <div class="flex">
                        <div class="text-blue-500 w-6 flex-shrink-0 text-center">@</div>
                        <div class="terminal-content">
                            <div class="typing-animation">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        
        <div class="terminal-input-container absolute bottom-0 left-0 right-0 p-2 border-t border-base-content/20 bg-base-300 z-10">
            <div class="flex flex-col w-full">
                <!-- Input area -->
                <div class="flex items-start">
                    <span class="text-success mr-2">$</span>
                    <textarea
                        bind:value={inputValue}
                        oninput={adjustTextareaHeight}
                        onkeydown={handleKeydown}
                        class="bg-transparent flex-grow resize-none overflow-hidden focus:outline-none text-base-content whitespace-pre-wrap break-all min-h-[24px]"
                        rows="1"
                        style="height: {inputHeight}px;"
                        placeholder="Type your command..."
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none; 
  }
  
  .terminal-message {
    padding: 0.25rem 0.5rem;
  }
  
  .terminal-content {
    flex: 1;
  }

  .typing-animation span {
    animation: typingDots 1.4s infinite;
    display: inline-block;
  }

  .typing-animation span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-animation span:nth-child(3) {
    animation-delay: 0.4s;
  }

  /* Custom select styling */
  .custom-select {
    background-color: #1d232a;
    color: #a6adba;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(166, 173, 186, 0.8)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1em;
    padding-right: 2rem;
  }
  
  /* This is the most important part for fixing the white background */
  .custom-select,
  .custom-select option {
    background-color: #1d232a !important;
    color: #a6adba !important;
  }
  
  /* Remove default focus styling and add custom */
  .custom-select:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  /* Custom tooltip styling */
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip:hover::after {
    content: attr(data-tip);
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 5px;
    padding: 4px 8px;
    background-color: #2a323c;
    color: #a6adba;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 50;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  @keyframes typingDots {
    0%, 20% {
      opacity: 0;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-2px);
    }
    80%, 100% {
      opacity: 0;
      transform: translateY(0);
    }
  }
</style>
