package ai

type (
	ollamaList struct {
		Models []ollamaListModelInfo `json:"models"`
	}
	ollamaListModelInfo struct {
		Name string `json:"name"`
	}
	ollamaGenerateResponse struct {
		Message ollamaGenerateMessage `json:"message"`
	}
	ollamaGenerateMessage struct {
		Content string `json:"content"`
	}
	ollamaChatRequest struct {
		Model    string              `json:"model"`
		Messages []ollamaChatMessage `json:"messages"`
	}

	ollamaChatMessage struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	}
)
