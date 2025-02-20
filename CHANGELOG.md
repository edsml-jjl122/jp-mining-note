# Changelog
The last 3 numbers (# in X.#.#.#) follow semantic versioning.


The first number (X in X.#.#.#) is an arbitrary number that I decide for
when the card passes a specific stage (i.e. 0 == pre-release, 1 = release, and
subsequent bumps are when the card has changed enough that a bump should be
signified.)


Historically, the 2nd number was bumped up for different reasons,
but now, the 2nd number will have a constant representation:
it is bumped when the Anki database schema becomes different
from the previous version.
This specifically happens when the fields are edited in any way
(renamed, moved, added, removed, etc.)

When the database schema changes, a user cannot automatically update their cards
by simply installing a new version of the .apkg package,
and must use `./install.py --update`.


## [0.11.0.6] - 2024-03-09
#### Fixes
- Expanded images by default in the Primary Definition, to prevent issues with some dictionaries that use images as tags
- Updated documentation to link to my own fork of AJT Japanese which is preconfigured with the correct config settings
- Replaced furigana:PrimaryDefinition with PrimaryDefinition to prevent issues with some dictionaries that use square brackets in the definitions



## [0.11.0.5] - 2023-10-06
#### Fixes
- Updated the way pitch accent is styled to work with the latest version of AJTJapanese. Pronunciation is now styled with the following html span classes:
    - `<span class="high">...</span>`: High pitch overline that doesn't drop
    - `<span class="high_drop">...</span>`: High pitch overline that drops at the `</span>`
    - `<span class="devoiced">...</span>`: Colors devoiced morae blue
    - `<span class="nasal">..</span>`: Colors the nasal marker red

- Updated documentation

- Minor changes to gitignore file, fixed the location of the build folder, and other minor dev tool tweaks



## [0.11.0.4] - 2023-04-10
#### Fixes
- Fixed the default config to now ignore two errors:
    - An [Anki internal error](https://forums.ankiweb.net/t/windows-console-error-uncaught-typeerror-cannot-read-properties-of-null-reading-style/29185)
        introduced in Anki 2.1.61 for Windows users:
        ```
        Uncaught TypeError: Cannot read properties of null (reading 'style')
            at Ar (reviewer.js:7:112035)
        ```
    - Fixed `ReferenceError: EFDRC is not defined` error not being properly ignored.

Due to implementation details, default config changes are **not propagated between updates**
(this will be changed in 0.12.0.0).
Therefore, if you experience either error, you must manually replace the `ignored-errors`
key in the
[runtime options](https://aquafina-water-bottle.github.io/jp-mining-note/runtimeoptions/#accessing-editing)
with the following:
```js
      // Errors that contain the following the following strings will be ignored and not displayed.
      "ignored-errors": [
        // This error is caused by the "Edit Field During Review (Cloze)" add-on.
        // However, this error only appears during the preview and edit cards template windows.
        // This error does not appear to actually affect any of the internal javascript within the card,
        // and is rather caused by the add-on itself.
        // Due to the card's error catcher, this previously-silent error is now caught and shown
        // in the card's error log, despite it not actually affecting anything.
        // Therefore, this error can be safely ignored.
        "ReferenceError: EFDRC is not defined",

        // Vanilla Anki 2.1.61 seems to introduce this error on Windows. It doesn't seem to affect
        // anything visible, so hopefully this is fine to ignore.
        // Related report: https://forums.ankiweb.net/t/29185
        "/_anki/js/reviewer.js:7:112035)"
      ],
```



## [0.11.0.3] - 2022-12-21
#### Fixes
- Fixed links having the wrong color on Anki v2.1.55
- Fixed kanji hover: replace method occasionally adds text when unnecessary


## [0.11.0.2] - 2022-11-21
#### Fixes
- Fixed `PAPositions` field erroring if edited with the standard templates
- Fixed `PAPositions` field not being properly parsed if it is just text (e.g. `[0]`)


## [0.11.0.1] - 2022-11-20
#### Fixes
- Fixed `TIME_PERFORMANCE` not defined for click cards


## [0.11.0.0] - 2022-11-19
#### Breaking Changes
- Added fields: `PAOverrideText`, `PrimaryDefinitionPicture`, `WordReadingHiragana`

#### Features
- Modules:
    - Added similar words indicators (`word-indicators` module)
        - Indicators are shown for: same kanji, same reading, duplicates
    - Moved `info-circle-togglable-lock` to the `info-circle-utils` module
        - Added various mobile-related support to the info circle
    - Added `img-utils-minimal` as a counterpart to `img-utils` for people who want a lighter card
    - Revamped `auto-pitch-accent` module:
        - Added support for various formats in `PAOverride` (csv numbers, and text with downsteps)
        - Added source on hover support (hover over the pitch accent to see where the pitch was gotten from)
    - Added a way to fix ruby positioning for legacy Anki versions (`fix-ruby-positioning` module)
    - Added way to time the performance of the javascript (`time-performance` module)
- Added the `PrimaryDefinitionPicture` field
    - Specifies a picture that is always shown to the right of the primary definition
    - Can be technically anything else though, like a table, text, etc.
- Improved tooltips (affects `word-indicators` and `kanji-hover`):
    - Added pitch accent on tooltips
        - Enabled for both `kanji-hover` and `same-word-indicator` by default
        - Requires you to hover over the word/sentence for kanji-hover by default
    - Added logic to overflow between categories (e.g. 6 new & 0 old will now show 6 new instead of 2 new)
    - Added ability to click on words in a tooltip to view it within Anki
- Runtime options:
    - Added way to specify different values for mobile and PC
    - Combined `toggle-states-pc` and `toggle-states-mobile` -> `toggle-states`
    - Renamed `nsfw-toggle` -> `image-blur`
    - Added a new type of `viewport-width-is`
    - Added:
        - `modules.img-utils.add-image-if-contains-tags`
        - `modules.sent-utils.remove-final-period`
        - `modules.sent-utils.remove-final-period-on-altdisplay`
        - `modules.customize-open-fields.open-on-new-enabled`
        - `enable-ankiconnect-features`
- Changed error messages to be displayed in standard monospace font, for better readability
- Added compile-options to allow external links to be in the `PrimaryDefinition` field
- Revamped the documentation layout quite a bit, to now include tabs in the header
- Added the `jpmn-sentence-bolded-furigana-plain` header to yomichan templates
- Added the `dict-group__glossary--first-line` to the templates to allow the removal of the first line with css
- Ignore errors from batch functions by default

#### Fixes
- Fixed a bug on AnkiDroid where all javascript fails on the front side of the main card type
- Fixed keybinds not working on capslock / capital letters
- Made strings in queries escaped by default
- Fixed mora with the nasal marker not showing properly on tooltips
- Fixed `make.py` not working on windows (encoding errors, template files not found)
- Fixed AJT Word readings not being properly found on words split with "、"
- Removed `--highlight-bold-shadow` (variable is no longer added automatically in the fields with css injector)

#### Fixes (for new updates)
- Fixed number parser not handling non-integer values properly
- Properly handles undefined timer result
- Fixed balancing operation of tooltip filter cards (now uses integer div instead of float div)

#### Internal Changes
- Added a simple dependencies system for modules, so functions can be shared easier between modules
- Refactored AutoPA & KanjiHover classes to have most functions to be in the returned class itself
- Moved out multiple functions into a bunch of smaller sub-modules:
    - `jp-utils`: functions for dealing with the Japanese language itself (e.g. hiragana -> katakana)
    - `tooltip-builder`: creates tooltips for kanji-hover and word-indicators
    - `anki-connect-actions`: helper module to use anki-connect
    - `check-duplicate-key`: checks whether the key is a duplicate (moved from the `cardIsNew` function)
- Fixed a bug with item(javascript=True) when it returns a dictionary (now parses into json)
- Added color change when highlighting over URLs
- `kanji-hover` card cache is now cached in as an element instead of strings to improve performance
- Changed the implementation of the tooltip builder to use `hover-tooltip__sent-div` to remove the bold for a sentence instead of a regex replace (lol)
    - This allows custom CSS to re-bold the highlighted word in the sentence again
- Added some basic support to mobile (media queries on various screen widths)
    - Mobile is still not officially supported (not all desired features are implemented yet)
- Made the `img-utils` module a bit faster by grouping together the .offsetHeight calls + only calling them if necessary
    - Prevents unnecessary reflows
- Added a debug div within the info circle to display monospaced debug messages
- Added additional css to be able to remove the "(N/A)" display

#### Update Notes (0.11.0.0)
- Update Yomichan's 'Anki Card Templates' section.
    - See [here](https://aquafina-water-bottle.github.io/jp-mining-note/updating/#updating-yomichan-templates)
      for instructions on how to update Anki Card Templates.
- Update Yomichan's 'Anki Card format' section WordReadingHiragana: `(empty)` -> `{jpmn-word-reading-hiragana}`.
    - See [here](https://aquafina-water-bottle.github.io/jp-mining-note/updating/#updating-yomichans-anki-card-format)
      for instructions on how to update Anki Card Format.
- If you are using the nsfw-toggle function, the option name was changed
  from `nsfw-toggle` to `image-blur`. Please change it in your runtime options
  to continue using it.
  [Example config](https://github.com/Aquafina-water-bottle/jp-mining-note/blob/master/media/_jpmn-options.js)
- The way keybinds are specified has been changed (to allow keys to still function as expected
  even with CapsLock enabled.)
  Keybinds will no longer work until you update the runtime options values.
  For example, update `n` to `KeyN`.
  [Example config](https://github.com/Aquafina-water-bottle/jp-mining-note/blob/master/media/_jpmn-options.js)


## [0.10.3.0] - 2022-10-21

#### Features
- Added some documentation links to common errors / warnings that can appear
- Added compile options to specify external links as icons or text
- Added nsfw toggle to img-utils module
    - clickable inputs: info circle eye, image eye
- Clicking on the info circle now freezes the tooltip window
    - Togglable with the `info-circle-togglable-lock` option, enabled by default

#### Fixes
- Fixed a bug with one-mora 平板 words not showing the proper reading within the pitch accent field
- Added support to the old orthographic dictionary name for proper table alignment
- `customize-open-fields` module now works even if neither `PAGraphs` and `UtilityDictionaries` are present

#### Internal Changes
- Added an `isHtml` function param to `logger.warn` and `logger.error`
- Changed the `modules` from a list to dictionary (in order to make it easier to check if the module is enabled or not)
- Added a popup menu function (not very flexible currently, as it will not scale well with large messages)
- Added debugging levels from 0-5 (default is 3)


## [0.10.2.1] - 2022-10-15

#### Features
- ShareX image + clipboard hotkey now attempts to highlight the tested word within the clipboard

#### Fixes
- (hotkey.py) Updating the sentence from the clipboard no longer produces newlines
- Fixed a bug in the Yomichan templates that grabs the last found definition instead of the first
- Added a hack to ensure that triple-click no longer copies extra text in the texthooker page
- Example config now has modules ordered in the correct position

#### Internal Changes
- Source powershell code in jpresources is now syntax highlighted


## [0.10.2.0] - 2022-10-02
Final major update before public beta!

Note: changing the layout of the changelog from this point forward.

#### Features
- templates overrides folder option
- formal ability to separate css: ("css-folders") option in config
- full support for light mode
- automatic pitch accent coloring for the tested word (disabled by default)
- handlebars support to selection-text:
    - highlight a dictionary to override the PrimaryDefinition
    - highlight a section of the definition to override the PrimaryDefinition + bold it
        - if cannot find highlighted section, fallsback to normal selection-text
- `keybinds-enabled` compile-time option
- `hardcoded-runtime-options` compile-time option

#### Fixes
- `_field.css` not being included on export
- `EFDRC is not defined` error showing on the card
    - Added `ignored-errors` in config to ignore this error
- bolded `AJTWordPitch` field not being parsed properly
- fixed `always-filled-fields` and `never-filled-fields` not working properly with compile options

#### Internal Changes

- Added `NoteToUser` action class
- Added tests to some macros and field simulator
- added `_editor.css` on build and export
    - updated documentation

- changed example module to print hello world
- layout of templates: every variable in the `common.html` files were moved into
  individual files: `partials/variable_name.html`
    - allows users to override these partials easier (inspired by material mkdocs)
- combined legacy display with regular display in main card type
- cleaned up most of the python code (removed commented code, added type hinting, etc.)
- cleaned up scss a bit
    - separated exact functionality from the name, i.e. `bold-yellow` -> `highlight-bold`
- changed internal build system to work with custom css
- separated other_definitions partial into each blockquote's partial
- handlebars `jpmn-get-dict-type` function: no longer requires `[object Object]` in the `X-dict-regex` options
- changed `jpmn-frequencies` handlebars to match the other handlebars (removed outer class and inner2 class)
- removed attempts to remove newlines in various handlebars code within javascript
- renamed `any_of` -> `if_any` and `none_of` -> `if_none`
- changed compile options comment at the top to only include the compile-options section
    - moved `css-folders` to be under `compile-options` in `config.py`
- added try catch wrapper around errorStack to ensure the message gets called
- `--ignore-order` flag now ignores the MoveField action, and always adds fields at the end of the list

- fixed `_standardize_frequencies_styling` not working on all `inner2` classes in `batch.py`
- fixed `def_header` macro being defined twice for some reason
- field tests now properly runs (using `Verifier`)





## [0.10.1.0] - 2022-09-18
Primarily a back-end only update.

#### Added
- re-implemented compile time options for always-filled and never-filled
- comment at the top of all cards with the compile-time options

#### Changed
- cleaning up the code:
    - moved javascript code out into their own `modules` folder under `templates`
      (and included them in the compile time options)
        - added example module main.js
    - generalized "open extra info on new" into its own module
    - turned the logger definition a class, and changed the global logger object from `logger` to `LOGGER`
    - id `Display` -> `display`
    - replaced as many `let` statements with `const`
    - changed javascript modules to return classes, in the format of:
       ```
       const CLASS_NAME = (() => {
         // private variables and functions

         class CLASS_NAME {
           // public functions
         }

         return CLASS_NAME;
       })();
       ```
       - with their own individual logger objects
    - moved paIndicator to a main card only variable
    - added try/catches around each module's javascript "run" sections
       - if one module breaks, the entire card doesn't break
    - encapsulated all "run" code into main function

#### Fixed
- `replaceAll` -> `replace` with `g` flag, to support older versions of Anki (qt5)
- AJTWordPitch field not having the proper css for bolded words



## [0.10.0.1] - 2022-09-05

#### Added
- `search-for-ajt-word` js option

#### Changed
- Minor stylistic changes
    - JPDB's "X" emote changed to a non-colored version in Yomichan Templates
    - Changed margin-bottom of lists from 10px to 0.3em to better match font sizes

#### Fixed
- Clicking on inserted images not working
- Certain readings not converting to ruby properly due to manually inserted spaces (`&nbsp;`)
- Kanji Hover tooltip not having a max-width


## [0.10.0.0] - 2022-09-04

#### Changed (BREAKING)
- Added fields (`PAOverride`, `PAPositions`)
    - `PAPositions` requires updated Yomichan templates
- Renamed field `WordPitch` -> `AJTWordPitch`


#### Added
- Added support for showing pitch accent using only Yomichan's `pitch-accent-positions` template
    - as well as customly from AJT Pitch accent & ways to overwrite both
- Added fields (`PAOverride` and `PAPositions`)
- `jpmn-test-dict-type` and `jpmn-pitch-accent-positions` yomichan template markers
  to bottom.txt
- Uses `Sentence` if `SentenceReading` is empty
    - Option to warn if `SentenceReading` is empty
- Warning if `IsHoverCard` and `IsClickCard` are both filled
- Option to disable `searchImages` (for {{edit:FIELD}} compatability

#### Changed
- regex options in Yomichan templates to be more clear in documentation
    - added "ADD_x_DICTIONARIES_HERE" strings
- Backend javascript to be more modulized (so far, modulized auto pitch accent, kanji hover, images)

#### Fixed
- `??` operator not working on legacy anki versions (changed to use `nullish` function instead)
- duplicate key wrongly detecting the same note with different cards


## [0.9.1.1] - 2022-08-31
#### Fixed
- `media.css` now properly renamed to `_media.css`
- Fixed extra info not properly opening on some new cards


## [0.9.1.0] - 2022-08-30

#### Added
- Added `FrequencySort` field
- Settings:
    - Kanji hover query
    - Kanji hover enable/disable
    - Kanji hover activation mode (only run on first hover, or run as soon as the back-side is open)
- Frequency sort support in batch and yomichan templates
    - Note: not updating the yomichan templates does not break the card functionality,
      so this is not a breaking change
- Open extra info field on new feature
- Caps lock warning
- Options to specify max number of words per category in the kanji hover tooltip
- User inserted images now also change to the [Image] / hover / click to zoom property
  that Yomichan images have

#### Fixed
- Field simulator bug with move field
- Installing from scratch not working
- Cloze-deletion cards not having sentence audio at the front


## [0.9.0.0] - 2022-08-28

#### Changed (BREAKING)
- yomichan templates:
    - unified one option for monolingual / bilingual
    - added "unused dictionaries" section, takes priority over all other searches
    - removed "No pitch accent data" in favor of an empty field
    - added "JMDict Surface Forms" to utility dict and "日本語文法辞典" to bilingual dict regex
    - added a span around each dictionary glossary entry
- renamed `silence.wav` -> `_silence.wav`
- added an additional inner html field around the downstep arrow so css can automatically remove it
    - requires a change to the AJT pitch accent plugin config

#### Changed
- collapsable fields are now greyed out instead of gone (no option for this yet)
- added css to center elements in the orthographic forms dictionary
- removed prettier dependency, added JSON-minify dependency
- separated `config/example_config.py` into {
     `config/example_config.py`,
     `config/jpmn_opts.jsonc`,
     `tools/note_files.py` } to prevent having to regenerate the config file on version updates
- made install.py work when updating a card to:
    - edit existing fields in place
    - warn the user on updates outside anki (e.g. config changes, yomichan templates, etc.)
- added kanji hover (to display which kanjis were used in previous cards)


## [0.8.1.1] - 2022-08-15

#### Fixed
- settings variable not being defined causing an error
- a bug regarding sentences occasionally being off-center (due to the frequencies)


## [0.8.1.0] - 2022-08-14

#### Changed
- Options file layout (no longer breaking as every option has defaults now)
- Quotes now generate by default (and even if javascript fails to run entirely)

#### Removed
- Smallest sentence option (adds bloat, don't think people will use it when better alternatives exist)


## [0.8.0.0] - 2022-08-13

#### Changed (BREAKING)
- Changed the serif font family to NotoSerif
- Added bold variants to both serif and sans
- Requires an update to the media folder with the new font files

#### Added
- css to no longer select furigana (note: text is still copied on linux)
- stack trace to error messages
- initial sharex shortcuts (powershell scripts) to tools

#### Changed
- Completely reworked the backend generation of cards to use jinja2
- Renamed:
    - `refresh.py` -> `main.py`
    - `update.py` -> `install.py`
    - `generate.py` -> `make.py`
- Reworked the directory structure of the project

#### Fixed
- The async race condition (undid all changes to use script src)


## [0.7.0.1] - 2022-07-26

#### Fixed
- Changed the promise into an async / await function at the cost of code separation
    - Previous fix to promises didn't work upon any card flip...


## [0.7.0.0] - 2022-07-26

#### Changed (BREAKING)
- Changed `PADictionaries` -> `UtilityDictionaries`

#### Changed
- More changes to yomichan templates, still WIP
- Added options file to be automatically updated from ./update.py

#### Fixed
- Properly handled script (options file) asynchronously loading
- Properly handled the promise to not execute twice



## [0.6.0.1] - 2022-07-17

#### Fixed
- Generating pitch accent (sentence and word) cards despite not specifying to


## [0.6.0.0] - 2022-07-16

#### Changed (BREAKING)
- Changed `PADoNotShowInfo` -> `PAShowInfo` and reversed its role
    - Intention is to make PA not show by default,
      to avoid confusion for beginners and to make writing documentation easier

#### Added
- Basic support for light mode
- Option to override the play button on hybrid sentence cards



## [0.5.1.0] - 2022-07-16

#### Added
- Leech now shows as yellow on the info circle on the back side of cards

#### Changed
- Templates now use some global options to make things easier to change
- Pitch accent template now uses tags (I have no idea why they didn't before)

#### Fixed
- Quote left align working properly (now uses text-indent instead of flex div hackery)




## [0.5.0.0] - 2022-07-16
#### Changed (BREAKING)
- Renamed `Graph` -> `PAGraphs`
    - Format of data has been changed as well to include divs, css classes and dictionary names
- Renamed `Position` -> `PADictionaries`
    - Completely replaced the usage of this field:
      all previous filled instances of this field must be removed.

#### Changed
- Completely rewrite yomichan handlebars code
  - Primary definition now grabs the bilingual definition if no other dictionary exists
  - Removed italics on dictionary names that have japanese characters
    (effectively restricting it to jmdict only)

#### Added
- Better support for multiple pitch accent dictionaries (section under Extra Definitions)
  - Added the corresponding keybind (default "[")
  - Added corresponding yomichan handlebars code



## [0.4.0.0] - 2022-07-15
#### Changed (BREAKING)
- Renamed PADoNotShowInfoLegacy -> PADoNotShowInfo

#### Added
- Quote parsing:
  - Quotes are now right aligned with proper spacing (so the left quote covers the entire text box)
  - Quotes can be colored
    - PA indicator is automatically hidden with colored quotes
  - Support for custom automated quotes
- Implemented "isMobile" function in options
- Lowercase and uppercase keybinds are now supported
  - i.e. keybinds still work in case one accidentally presses capslock
- Implemented isMobile() in options

#### Dev notes
- Moved log messages into its own class
- Moved PA indicator into its own class
- Moved PA indicator to after the element with order 1 for css styling purposes


## [0.3.0.0] - 2022-07-11

#### Changed (BREAKING)
- Format of the settings file has been changed (javascript will break with the old settings format)

#### Changed
- Redid the settings format and made the settings easier to use
- Fixed sentence parsing not always selecting a sentence (PA cards, AltDisplay)

#### Fixed
- Positioning of the arrow on the info circle tooltip
- Info circle tooltip not remaining upon hovering on windows machines


## [0.2.2.1] - 2022-07-08
#### Fixed
- Made the info circle appear on all cards instead of just the main card
- Made the tooltip scale up to 500px width


## [0.2.2.0] - 2022-07-08
#### Added
- Implemented info circle with js fail errors, options warnings and general info


## [0.2.1.1] - 2022-07-08
#### Added
- CSS constuct to not repeat code with anki templates
- Added info circle icon

#### Fixed
- Removed old comments in options file
- show/hide highlight word button not working


## [0.2.1.0] - 2022-07-07
#### Added
- Implemented following js options:
    - select-smallest-sentence
    - play-word-audio
    - toggle-front-full-sentence-display
    - toggle-hint-display
    - toggle-secondary-definitions-display
    - toggle-additional-notes-display
    - toggle-extra-definitions-display

#### Fixed
- No image breaking javascript


## [0.2.0.0] - 2022-07-07
#### Changed (BREAKING)
- Moved options to separate media file.

#### Added
- Automatic way to add / update options file from the repo to the deck via update.py (with flag -o)

#### Fixed
- Fixed the Show/Hide (highlight word) button at the front from appearing on click/hover cards
- No longer shows the full sentence at the front when the card is a TSC
- Fixed process sentence function not working on pure TSCs


## [0.1.1.0] - 2022-06-28
#### Added
- Keybind functionality to the main card type for playing sentence
audio, toggling pitch accent word in a sentence card & toggling hybrid cards

#### Fixed
- Fixed the shift button not always working
- Fixed TSC field not properly changing the underline to solid when the
`IsSentenceCard` field is not filled, on click / hover cards


## [0.1.0.0] - 2022-06-25
#### Changed (BREAKING)
- Renamed field `ForceHighlightSentence` -> `IsTargetedSentenceCard`

#### Changed
- Changed the functionality of `ForceHighlightSentence` to be its own
individual `IsTargetedSentenceCard` (filling `IsSentenceCard` is now optional,
click and hover cards still use the field to create the (now renamed) click
TSCs and hover TSCs.
- Changed the versioning system from normal semantic versioning to X.(semantic
versioning)

#### Fixed
- Fixed having the "show" button on TSCs


## [0.0.1.1] - 2022-06-25
#### Added
- (WIP) Adding various support for mobile anki styles. PC styles should not be
affected.


## [0.0.1.0] - 2022-06-23
#### Added
- First official "version" attached to the card

