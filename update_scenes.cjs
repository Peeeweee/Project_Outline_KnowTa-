const fs = require('fs');

const scenesPath = 'src/data/scenes.ts';
let content = fs.readFileSync(scenesPath, 'utf8');

// 1. Rename fields in interfaces
content = content.replace(/plain: string;/g, 'detail: string;\n  short?: string;');
content = content.replace(/description: string;/g, 'detail: string;\n  short?: string;');
content = content.replace(/whatItSays: string;\n  whatItMeansForKnowTa: string;/g, 'detail: string;\n  short: string;');

// Replace plain: with detail:
content = content.replace(/plain:/g, 'detail:');
content = content.replace(/description:/g, 'detail:');

// S01 HERO
content = content.replace(
  /headline: 'Can you tell which song is human\?',/,
  `headline: 'Can you tell which song is human?',\n    short: 'Know-Ta! detects AI-generated music and shows how sure it is.',`
);
content = content.replace(
  /label: 'AI-GENERATED MUSIC DETECTION',/,
  `label: 'THESIS PRESENTATION | CHAPTERS 1 AND 2',`
);
content = content.replace(
  /bottomRow: \[\n        'CHAPTERS 1 AND 2 \/ THESIS PRESENTATION',\n        'USEP, COLLEGE OF INFORMATION AND COMPUTING \/ DAVAO CITY',\n        'DELGADO · DELGADO · LABAY',\n      \],/,
  `bottomRow: [\n        'Delgado | Delgado | Labay | USeP CIC',\n        '',\n        '',\n      ],`
);

// S02 NUMBERS
content = content.replace(
  /headline: "THE UPLOADS NEVER STOP\. LISTENING CAN'T KEEP UP\.",/,
  `headline: "Listening can't keep up.",`
);
// Stats
content = content.replace(
  /value: '97%',\n        detail:/,
  `value: '97%',\n        short: 'could not tell human from AI',\n        detail:`
);
content = content.replace(
  /value: 'about 90,000',\n        detail:/,
  `value: '90,000',\n        short: 'AI tracks a day at Deezer',\n        detail:`
);
content = content.replace(
  /value: '24%',\n        detail:/,
  `value: '24%',\n        short: 'of creator revenue at risk by 2028',\n        detail:`
);

// S04 HOME
content = content.replace(
  /headline: 'THE SAME WORRY, CLOSER TO HOME\.',/,
  `headline: 'Closer to home.',`
);
content = content.replace(
  /title: 'IPOPHL DRAFT RULES',\n        detail:/,
  `title: 'Draft copyright rules',\n        short: 'Wholly AI works would not qualify.',\n        detail:`
);
content = content.replace(
  /title: 'AI ARTIST ON THE SPOTIFY PH CHART',\n        detail:/,
  `title: 'AI act on the charts',\n        short: 'An AI artist reached Spotify PH.',\n        detail:`
);
content = content.replace(
  /title: 'PABLO OF SB19',\n        detail:/,
  `title: 'Artists speak up',\n        short: "SB19's Pablo calls for consent.",\n        detail:`
);
content = content.replace(
  /note: 'NO DAVAO-SPECIFIC SOURCE WAS FOUND\. THIS STUDY USES NATIONAL AND INTERNATIONAL EVIDENCE\.',/,
  `note: 'No Davao-specific source found.',`
);

// S05 GAP
content = content.replace(
  /headline: "Today's detectors break in five ways",/,
  `headline: "Where detectors break.",`
);
content = content.replace(
  /title: 'Pitch shift',\n        detail:/,
  `title: 'Pitch shift',\n        short: 'Small shifts drop accuracy.',\n        detail:`
);
content = content.replace(
  /title: 'Ignore the voice',\n        detail:/,
  `title: 'Ignores the voice',\n        short: 'Vocal cues go unused.',\n        detail:`
);
content = content.replace(
  /title: 'Blended audio',\n        detail:/,
  `title: 'Blended audio',\n        short: 'Voice and instruments stay mixed.',\n        detail:`
);
content = content.replace(
  /title: 'Unseen generators',\n        detail:/,
  `title: 'Unseen generators',\n        short: 'New AI tools break old detectors.',\n        detail:`
);
content = content.replace(
  /title: 'Shortcuts',\n        detail:/,
  `title: 'Shortcuts',\n        short: 'It learns shortcuts, not music.',\n        detail:`
);

// S06 IDEA
content = content.replace(
  /headline: 'SPLIT THE SONG\. JUDGE EACH PART\. SHOW DOUBT\.',/,
  `headline: 'Split. Judge. Doubt.',\n    short: 'Voice and instruments are checked separately, then fused into one honest confidence.',`
);
// S06 Hotspots mapping to short (we can just add short to hotspot details if needed, but the prompt says: "steps: 'Split' / 'HTDemucs separates voice from instruments.'; 'Judge' / 'One branch listens to each part.'; 'Fuse' / 'Attention decides which part to trust more.'; 'Doubt' / '20 passes turn doubt into a percentage.'").
// Let's add 'steps' to S06 data.
content = content.replace(
  /hotspots: \[/,
  `steps: [\n      { label: 'Split', short: 'HTDemucs separates voice from instruments.' },\n      { label: 'Judge', short: 'One branch listens to each part.' },\n      { label: 'Fuse', short: 'Attention decides which part to trust more.' },\n      { label: 'Doubt', short: '20 passes turn doubt into a percentage.' }\n    ],\n    hotspots: [`
);

// S07 QUESTIONS
content = content.replace(
  /headline: 'Four questions, four testable predictions',/,
  `headline: 'Four questions.',`
);
// Flipcards need shortQuestion and shortHypothesis
content = content.replace(/question: string;\n  hypothesis: string;/g, 'question: string;\n  shortQuestion?: string;\n  hypothesis: string;\n  shortHypothesis?: string;');
content = content.replace(
  /question:\n          'How accurate is Know-Ta on held-out songs and on generators not used in training\?',\n        hypothesis:/,
  `question:\n          'How accurate is Know-Ta on held-out songs and on generators not used in training?',\n        shortQuestion: 'How accurate on unseen generators?',\n        shortHypothesis: 'Strong on familiar data, lower on unseen generators.',\n        hypothesis:`
);
content = content.replace(
  /question: 'Do separation, a vocal branch, and attention actually help\?',\n        hypothesis:/,
  `question: 'Do separation, a vocal branch, and attention actually help?',\n        shortQuestion: 'Do splitting, the voice branch, and attention help?',\n        shortHypothesis: 'The full system beats each simpler variant.',\n        hypothesis:`
);
content = content.replace(
  /question: 'Can users trust the confidence percentages\?',\n        hypothesis:/,
  `question: 'Can users trust the confidence percentages?',\n        shortQuestion: 'Can we trust the percentages?',\n        shortHypothesis: 'Calibration improves, and doubt is higher on errors.',\n        hypothesis:`
);
content = content.replace(
  /question: 'Does it warn when voice and instruments disagree\?',\n        hypothesis:/,
  `question: 'Does it warn when voice and instruments disagree?',\n        shortQuestion: 'Does it flag disagreement?',\n        shortHypothesis: 'It fires more on mixed songs.',\n        hypothesis:`
);

// S08 SCOPE
content = content.replace(
  /headline: "WHAT WE COVER\. WHAT WE DON'T\.",/,
  `headline: "Clear limits.",`
);
content = content.replace(
  /covers: \[\n      'English songs with singing',\n      'Human songs from FMA, AI songs from SONICS',\n      'Held-out test on Echoes',\n      'Full system, two simple variants, and an uncertainty score',\n      'A free web prototype',\n    \],/,
  `covers: [\n      'English songs with singing',\n      'SONICS, FMA, and Echoes data',\n      'Full system and two variants',\n      'A free web prototype',\n    ],`
);
content = content.replace(
  /doesNotCover: \[\n      'Filipino or other Philippine languages',\n      'Instrumental-only songs',\n      'Legal proof or takedowns',\n      'Whether a song copies a specific artist',\n      'Commercial use',\n    \],/,
  `doesNotCover: [\n      'Filipino songs',\n      'Instrumental-only songs',\n      'Legal proof',\n      'Commercial use',\n    ],`
);

// S09 LITERATURE
content = content.replace(
  /headline: 'WHAT THE LITERATURE SAYS\.',/,
  `headline: 'What we built on.',`
);
// "The click panel keeps its two blocks but each block max 2 lines (use the existing text, trimmed)."
// "eight names only: Generation, Detection, Separation, Spectral, Vocal, Attention, Uncertainty, Data."
// Topic labels are already those!
content = content.replace(/whatItSays:/g, 'detail1:');
content = content.replace(/whatItMeansForKnowTa:/g, 'detail2:');
content = content.replace(/detail1: string;\n  detail2: string;/g, 'detail1?: string;\n  detail2?: string;');

// S10 DATA
content = content.replace(
  /headline: 'TESTED ON GENERATORS IT HAS NEVER HEARD\.',/,
  `headline: 'Tested on the unheard.',\n    short: 'AI songs: SONICS\\nHuman songs: FMA\\nLocked test: Echoes',`
);

// S11 THEORY
content = content.replace(
  /headline: 'THREE IDEAS BEHIND THE DESIGN\.',/,
  `headline: 'Three ideas.',`
);
// panels: "Doubt" caption "Spread is doubt."; "Weights" caption "The model picks who to trust."; "Two views" caption "Two lenses, one verdict."
// Since these are hardcoded in S11Theory.tsx, we will update the component.

// S12 FRAMEWORK
content = content.replace(
  /headline: 'INPUT\. PROCESS\. OUTPUT\.',/,
  `headline: 'In. Process. Out.',`
);
content = content.replace(
  /items: \[\n          'SONICS fake \+ FMA human \(train, validate, internal test\)',\n          'Echoes \(cross-platform test\)',\n        \],/,
  `items: ['SONICS, FMA, Echoes'],`
);
content = content.replace(
  /items: \[\n          'HTDemucs',\n          'Audio Branch \(EfficientNet-B0\)',\n          'Vocal Branch \(Bidirectional LSTM\)',\n          'attention fusion',\n          'MC Dropout 20 passes \+ Temperature Scaling',\n        \],/,
  `items: ['Split, judge, fuse, doubt'],`
);
content = content.replace(
  /items: \[\n          'label',\n          'calibrated confidence',\n          'per-branch scores',\n          'conflict flag',\n          'report',\n        \],/,
  `items: ['Verdict, confidence, conflict flag'],`
);

// S13 VERDICT
content = content.replace(
  /headline: 'THE VERDICT, PRINTED\.',/,
  `headline: 'The report.',\n    short: 'Drop a song in.',`
);

// Footer
// The footer wordmark, links, names, "Sources" pill is hardcoded in FooterSection.tsx.

fs.writeFileSync(scenesPath, content, 'utf8');
console.log('Scenes updated');
