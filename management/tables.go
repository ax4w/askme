package main

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Admin    bool
}

type Key struct {
	gorm.Model
	Provider string `gorm:"unique"`
	Key      string
}
