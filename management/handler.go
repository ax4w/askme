package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ax4w/askme/mangement/ai"
	"github.com/golang-jwt/jwt/v5"
)

func signInHandler(w http.ResponseWriter, r *http.Request) {
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	username := body["username"]
	password := body["password"]

	user, err := getUser(username)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	if user.Password != passwordHash(password) {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}
	var (
		token = jwt.NewWithClaims(jwt.SigningMethodHS256,
			jwt.MapClaims{
				"username": username,
				"isAdmin":  isAdmin(username),
				"exp":      time.Now().Add(time.Hour * 24).Unix(),
			})
		tokenString, jwtErr = token.SignedString([]byte(adminPW))
	)
	if jwtErr != nil {
		http.Error(w, "Could not generate jwt", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"success": "true",
		"token":   tokenString,
	})
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{
		"success": true,
	})
}

func doesUserExistHandler(w http.ResponseWriter, r *http.Request) {
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	username := body["username"]

	exists, err := doesUserExist(username)
	if err != nil {
		http.Error(w, "Error checking if user exists", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]bool{
		"exists": exists,
	})
}

func getAvailableModelsHandler(w http.ResponseWriter, r *http.Request) {
	models := ai.AllAvailableModels()
	json.NewEncoder(w).Encode(models)
}

func queryModelHandler(w http.ResponseWriter, r *http.Request) {
	var body = make(map[string]string)
	json.NewDecoder(r.Body).Decode(&body)
	model := body["model"]
	message := body["message"]
	if model == "" || message == "" {
		http.Error(w, "Model and message are required", http.StatusBadRequest)
		return
	}
	json.NewEncoder(w).Encode(ai.QueryModel(model, message))
}
