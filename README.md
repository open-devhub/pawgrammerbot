# Pawgrammer Bot

Pawgrammer is DevHub’s documentation, AI, and reference assistant bot.
It provides access to AI chat, curated knowledge, and utility commands designed to support contributors and users across the platform.

The bot is built around a simple prefix-based interface focused on clarity, consistency, and fast access to information.

## Usage

Pawgrammer uses prefix commands. The available prefixes are:

- `.` → AI-first input mode
- `$` → Command-first mode

### AI-first mode (`.`)

The dot prefix sends your message directly to the AI system without requiring a command name.

Example:
. What is a JavaScript promise?
. Explain async/await in simple terms

### Command-first mode (`$`)

Use this for structured commands such as configuration, status checks, or utility actions.

Example:

```
$help
$ping
$persona list
$resetai
```

## Commands Overview

| Command   | Aliases                                  | Description                           |
| --------- | ---------------------------------------- | ------------------------------------- |
| `ai`      | `askai`                                  | Sends a prompt to the AI model        |
| `persona` | `personaai`, `mode`, `character`         | Manage or view AI personas            |
| `resetai` | `aiclear`, `clearai`, `aireset`, `reset` | Clears AI conversation context        |
| `help`    | —                                        | Displays available commands and usage |
| `ping`    | —                                        | Returns bot latency                   |

## AI Command Usage

The AI system supports both prefixes:

```
. What is event loop in Node.js?
$ai What is event loop in Node.js?
```

To reset context:

```
$resetai
or
$ai reset
```

Resetting clears conversation history and restores default behavior.

## Persona System

The persona system allows users to adjust the AI’s behavior and response style.

### Available subcommands:

- `$persona list`
  Displays all available personas.

- `$persona current` / `status` / `now` / `active`
  Shows the currently active persona.

- `$persona set <name>` / `use <name>` / `switch <name>`
  Switches to a selected persona.

- `$persona reset` / `clear`
  Restores the default persona and clears context.

## Design Philosophy

Pawgrammer is designed to:

- Provide fast and reliable access to AI-assisted information
- Encourage consistent and structured interactions
- Support developer productivity within DevHub
- Maintain a minimal and predictable command system

## License

Pawgrammer Bot is licensed under DSAL v1.0
See the full license in the [LICENSE](./LICENSE) file
