# TheRuleBook

A mobile-first Flutter application for explaining complex European-style board game rules, with game companions for scoring and gameplay assistance.

## Features

- 📖 **Rule Explainer**: Clear, searchable explanations for complex board games
- 🎯 **Game Companions**: Scoring calculators and gameplay assistants
- 📱 **Mobile-First**: Optimized for iPad and mobile devices
- 🔄 **Offline Support**: Access rules without internet connection
- 🎲 **BoardGameGeek Integration**: Rich game data and metadata

## Target Games

- Terraforming Mars
- Twilight Imperium
- Scythe
- Wingspan
- Spirit Island
- And more European-style board games

## Tech Stack

- **Framework**: Flutter 3.x
- **Language**: Dart 3.x
- **State Management**: Riverpod
- **Navigation**: Go Router
- **Local Storage**: Hive/Isar + SQLite
- **Backend**: Supabase/Firebase
- **API**: BoardGameGeek XML API

## Getting Started

### Prerequisites

- Docker Desktop (for devcontainer)
- VS Code with Remote - Containers extension

### Development Setup

1. Open this project in VS Code
2. When prompted, click "Reopen in Container" or run command `Remote-Containers: Reopen in Container`
3. Wait for the container to build and Flutter to initialize
4. Run `flutter doctor` to verify setup

### Running the App

```bash
# Run on web (for quick testing)
flutter run -d chrome

# Run on connected device
flutter run

# Run tests
flutter test
```

## Project Structure

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   └── router.dart
├── features/
│   ├── games/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   ├── rules/
│   └── companions/
├── core/
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   └── widgets/
└── shared/
    ├── models/
    └── services/
```

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License
