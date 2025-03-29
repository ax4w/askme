package ai

import (
	"context"
	"os"

	"github.com/openai/openai-go"
	"github.com/openai/openai-go/option"
)

var (
	deepSeekClient = openai.NewClient(
		option.WithAPIKey(os.Getenv("DEEPSEEK_API_KEY")),
		option.WithBaseURL("https://api.deepseek.com"),
	)
	geminiClient = openai.NewClient(
		option.WithAPIKey(os.Getenv("GEMINI_API_KEY")),
		option.WithBaseURL("https://generativelanguage.googleapis.com/v1beta/openai/"),
	)
	supportedModels = map[string]string{
		"deepseek-chat":     "deepseek Chat",
		"deepseek-reasoner": "deepseek Reasoner",
		"gemini-2.0-flash":  "gemini 2.0 flash",
	}
	modelToClient = map[string]openai.Client{
		"deepseek-chat":     deepSeekClient,
		"deepseek-reasoner": deepSeekClient,
		"gemini-2.0-flash":  geminiClient,
	}
)

func queryOpenAiModel(client openai.Client, model string, message string) string {
	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
		Messages: []openai.ChatCompletionMessageParamUnion{
			openai.SystemMessage("You are a helpful assistant, who only answers in markdown."),
			openai.UserMessage(message),
		},
		Model: model,
	})
	if err != nil {
		return ""
	}
	if len(chatCompletion.Choices) == 0 {
		return ""
	}
	return chatCompletion.Choices[0].Message.Content
}
