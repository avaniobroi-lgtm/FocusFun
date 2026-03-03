<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# FocusFun 🎯

## Basic Details

### Team Name: FocusFun Team

### Team Members
- Member 1: Adarsh - MBCCET
- Member 2: [Name] - MBCCET

### Hosted Project Link
[mention your project hosted link here]

### Project Description
FocusFun is a gamified study companion designed to enhance productivity through a "Mind Quest" system. It combines a Pomodoro-style timer with dynamic quizzes and strict focus modes to ensure deep work and knowledge retention.

### The Problem statement
Students often struggle with distractions during study sessions and find it difficult to retain information after long periods of reading without active engagement.

### The Solution
FocusFun solves this by implementing a "Strict Focus Mode" that penalizes distractions (like switching tabs) and a "Mind Quest" feature that generates instant quizzes from study topics using Wikipedia, turning revision into a game.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: HTML5, CSS3, JavaScript (ES6+)
- Frameworks used: Vanilla JS (No external frameworks for simplicity)
- Libraries used: Google Fonts (Inter), Wikipedia REST API
- Tools used: VS Code, Git, LocalStorage for persistence

**For Hardware:**
- Main components: [Not Applicable]
- Specifications: [Not Applicable]
- Tools required: [Not Applicable]

---

## Features

List the key features of your project:
- **Strict Focus Timer**: A Pomodoro timer with forced fullscreen and tab-visibility detection to prevent distractions.
- **Dynamic Mind Quest**: Automatically generates 3-question quizzes based on the study topic using Wikipedia data.
- **Gamified Dashboard**: Tracks study streaks, XP (Experience Points), and focus history to keep users motivated.
- **Social Connect**: A conceptual interface for connecting with friends to compare streaks and study topics.

---

## Implementation

### For Software:

#### Installation
```bash
git clone https://github.com/yourusername/FocusFun.git
cd FocusFun
```

#### Run
```bash
# Simply open index.html in any modern web browser
# Or use a Live Server extension in VS Code
```

### For Hardware:

#### Components Required
[Not Applicable]

#### Circuit Setup
[Not Applicable]

---

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](./img.png)
*Timer view with Focus Topic input*

![Screenshot2](./img.png)
*Dashboard showing study streaks and XP*

![Screenshot3](./img.png)
*Mind Quest generates quizzes from Wikipedia*

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*The app uses a client-side architecture where state is managed in memory and persisted via LocalStorage. External data is fetched from the Wikipedia API.*

**Application Workflow:**

![Workflow](docs/workflow.png)
*User sets a topic -> Starts Focus Timer (Strict Mode) -> Completes Session -> Takes Mind Quest -> Earns XP/Streak.*

---

### For Hardware:

#### Schematic & Circuit

![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://en.wikipedia.org/api/rest_v1`

##### Endpoints

**GET /page/summary/{topic}**
- **Description:** Fetches a summary of the study topic to generate quiz questions.
- **Parameters:**
  - `topic` (string): The subject the user is studying.
- **Response:**
```json
{
  "title": "Topic Name",
  "extract": "Summary text used for quiz generation..."
}
```

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** Antigravity (Google DeepMind)

**Purpose:** 
- Architecture design and planning
- Implementing dynamic quiz logic using Wikipedia API
- UI/UX enhancement with CSS Glassmorphism
- Documentation and README generation

**Key Prompts Used:**
- "Update the README in this format and add the project name FocusFun and the college name is MBCCET with the details of the website"

**Percentage of AI-generated code:** Approximately 30%

**Human Contributions:**
- Feature ideation and workflow design
- Integration of gamification elements
- Testing and validation

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- Adarsh: Frontend development, API integration, and Documentation.
- [Name 2]: UI/UX design and Testing.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
