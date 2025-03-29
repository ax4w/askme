# Build stage
FROM golang:1.24.1-alpine AS builder
WORKDIR /app
COPY . .
RUN apk add --no-cache build-base gcc musl-dev
RUN go mod download
RUN CGO_ENABLED=1 go build -o app .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/app /app/app
RUN apk add --no-cache ca-certificates && \
    adduser -D appuser
RUN mkdir -p /management-data && chown appuser:appuser /management-data
USER appuser
EXPOSE 6969
CMD ["./app"]