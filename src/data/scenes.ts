// src/data/scenes.ts
// Typed scene data parsed from content/scenes.md.
// Do not hardcode copy in components - always read from here.

export type Chapter = 'ch1' | 'ch2' | 'method';

export interface Stat {
  value: string;
  detail: string;
  short?: string;
  ref: string;
}

export interface FailureCard {
  title: string;
  detail: string;
  short?: string;
  refs: string;
}

export interface FlipCard {
  question: string;
  shortQuestion?: string;
  hypothesis: string;
  shortHypothesis?: string;
}

export interface LitNode {
  topic: string;
  detail1?: string;
  detail2?: string;
  sources?: number[];
}

export interface PipelineChip {
  label: string;
}

export interface ReceiptPreset {
  id?: string;
  label: string;
  songTitle?: string;
  aiProbability: number;
  spreadPlusMinus: number;
  audioPct: number;
  vocalPct: number;
  conflict: string | null;
  hasConflict?: boolean;
  conflictGap?: number;
  conflictThreshold?: number;
}

export interface QnAItem {
  question: string;
  answer: string;
}

export interface Stage {
  label: string;
  items: string[];
}

export interface HeroData {
  label: string;
  headlineLine1: string;
  headlineLine2: string;
  scriptWords: string[];
  body: string;
  exploreLink: string;
  tags: string[];
  bottomRow: [string, string, string];
  takeaway: string;
}

export interface HomeCard {
  index: string;
  title: string;
  detail: string;
  short?: string;
  refs: number[];
}

export interface HotspotDetail {
  name: string;
  line1: string;
  line2: string;
}

export interface SceneData {
  id: string;
  chapter: Chapter;
  section: string;
  headline: string;
  detail: string;
  short?: string;
  technical?: string;
  takeaway: string;
  illustrationLabel?: string;
  authors?: string;
  hero?: HeroData;
  caption?: string;
  note?: string;
  homeCards?: HomeCard[];
  stats?: Stat[];
  failureCards?: FailureCard[];
  flipCards?: FlipCard[];
  covers?: string[];
  doesNotCover?: string[];
  litNodes?: LitNode[];
  pipelineChips?: PipelineChip[];
  pipelineNote?: string;
  stages?: Stage[];
  steps?: { label: string; short: string }[];
  receiptPresets?: ReceiptPreset[];
  receiptFooter?: string;
  hotspots?: string[];
  hotspotDetails?: HotspotDetail[];
  tags?: string[];
}

export const scenes: SceneData[] = [
  {
    id: 'S01',
    chapter: 'ch1',
    section: 'Title',
    headline: 'Can you tell which song is human?',
    short: 'Know-Ta! detects AI-generated music and shows how sure it is.',
    detail: 'Two waveforms look the same. One song is human. One is AI.',
    technical:
      'Know-Ta!: A Two-Branch Deep Learning Framework for AI-Generated Music Detection with Cross-Platform Evaluation and Bayesian Uncertainty Estimation.',
    takeaway: 'LISTENING ALONE IS NO LONGER ENOUGH.',
    authors:
      'Delgado, Kent Paulo R.; Delgado, Earl Josh B.; Labay, John Renan N. | College of Information and Computing, University of Southeastern Philippines, Davao City',
    hero: {
      label: 'THESIS PRESENTATION | CHAPTERS 1 AND 2',
      headlineLine1: 'KNOW WHAT',
      headlineLine2: "YOU'RE",
      scriptWords: ['hearing', 'streaming', 'paying for', 'trusting'],
      body: 'A two-branch deep learning system that splits a song into voice and instruments, judges each part, and shows how sure it is.',
      exploreLink: 'EXPLORE THE STUDY ↗',
      tags: [
        'AUDIO BRANCH / EFFICIENTNET-B0',
        'VOCAL BRANCH / BI-LSTM',
        'FUSION / ATTENTION',
        'CONFIDENCE / MC DROPOUT',
      ],
      bottomRow: [
        'Delgado | Delgado | Labay | USeP CIC',
        '',
        '',
      ],
      takeaway: 'LISTENING ALONE IS NO LONGER ENOUGH.',
    },
  },
  {
    id: 'S02',
    chapter: 'ch1',
    section: 'THE SCALE',
    headline: "Listening can't keep up.",
    detail:
      'Tools like Suno and Udio make songs with vocals and lyrics from a short description.',
    technical:
      'Suno and Udio create complete songs with vocals, lyrics, and instruments across many genres [6].',
    takeaway: 'People cannot hear the difference, and the volume is growing.',
    stats: [
      {
        value: '97%',
        short: 'could not tell human from AI',
        detail:
          'COULD NOT TELL HUMAN FROM FULLY AI MUSIC, BLIND TEST WITH THREE TRACKS, ABOUT 9,000 ADULTS IN EIGHT COUNTRIES',
        ref: '[8]',
      },
      {
        value: '90,000',
        short: 'AI tracks a day at Deezer',
        detail:
          'FULLY AI TRACKS EACH DAY AT DEEZER, MORE THAN HALF OF DAILY UPLOADS AT THE JUNE 2026 PEAK',
        ref: '[9]',
      },
      {
        value: '24%',
        short: 'of creator revenue at risk by 2028',
        detail:
          "OF MUSIC CREATORS' REVENUE COULD BE AT RISK BY 2028",
        ref: '[10]',
      },
    ],
    caption: '200+ ARTISTS SIGNED AN OPEN LETTER AGAINST THE PREDATORY USE OF AI [11]',
  },
  {
    id: 'S03',
    chapter: 'ch1',
    section: '1.1 Background',
    headline: 'Every AI track competes for the same royalties',
    detail:
      'Streaming income is shared. Each AI track that earns plays takes a share from a human artist.',
    technical:
      'Each synthetic track competes for the same listener attention and royalty payments. More than 200 artists signed an open letter against the predatory use of AI [11].',
    takeaway: 'Without detection, fair pay is hard to protect.',
    illustrationLabel: 'Illustration',
  },
  {
    id: 'S04',
    chapter: 'ch1',
    section: 'CLOSER TO HOME',
    headline: 'Closer to home.',
    detail:
      'The government is drafting copyright rules for AI music, and OPM artists are speaking up.',
    technical:
      'IPOPHL drafted guidelines under which works made wholly by AI would not qualify for copyright registration [20]. An AI artist covering Filipino songs appeared on the Spotify Philippines Daily Top Artists chart [21], [22]. Pablo of SB19 said using artists’ work and identity without consent is unethical and should be illegal [23].',
    takeaway: 'Local artists have little protection and no simple way to check a song.',
    homeCards: [
      {
        index: '01',
        title: 'Draft copyright rules',
        short: 'Wholly AI works would not qualify.',
        detail: 'WORKS MADE WHOLLY BY AI WOULD NOT QUALIFY FOR COPYRIGHT REGISTRATION',
        refs: [20],
      },
      {
        index: '02',
        title: 'AI act on the charts',
        short: 'An AI artist reached Spotify PH.',
        detail: 'AN AI ACT COVERING FILIPINO SONGS APPEARED ON THE DAILY TOP ARTISTS CHART',
        refs: [21, 22],
      },
      {
        index: '03',
        title: 'Artists speak up',
        short: "SB19's Pablo calls for consent.",
        detail: "USING ARTISTS' WORK AND IDENTITY WITHOUT CONSENT IS UNETHICAL",
        refs: [23],
      },
    ],
    note: 'No Davao-specific source found.',
  },
  {
    id: 'S05',
    chapter: 'ch1',
    section: '1.1 Background',
    headline: "Where detectors break.",
    detail:
      'Each weakness lets an AI track slip past a detector undetected.',
    technical:
      'Single-mix pipelines fail on pitch shifts, ignore vocal cues, blend audio without separation, struggle on unseen generators, and learn encoding shortcuts instead of music.',
    takeaway: 'High lab scores do not mean reliable detection.',
    illustrationLabel: 'Illustration of the degradation reported in [15], not measured data.',
    failureCards: [
      {
        title: 'Pitch shift',
        short: 'Small shifts drop accuracy.',
        detail:
          'Single-mix detectors degrade substantially when pitch is slightly shifted',
        refs: '[15]',
      },
      {
        title: 'Ignores the voice',
        short: 'Vocal cues go unused.',
        detail:
          'Benchmarks treat multimodality as melody and lyrics only, and models like SpecTTTra do not explicitly use vocal cues such as breathing pauses and vibrato',
        refs: '[16], [17]',
      },
      {
        title: 'Blended audio',
        short: 'Voice and instruments stay mixed.',
        detail:
          'Two-branch systems still use the whole mix without separating vocals and instruments',
        refs: '[18]',
      },
      {
        title: 'Unseen generators',
        short: 'New AI tools break old detectors.',
        detail: 'Models struggle on AI generators they did not see in training',
        refs: '[19]',
      },
      {
        title: 'Shortcuts',
        short: 'It learns shortcuts, not music.',
        detail:
          'When real and AI songs come from different sources, a detector can learn silence, bandwidth, or encoding instead of music',
        refs: '[33], [52]',
      },
    ],
  },
  {
    id: 'S06',
    chapter: 'ch1',
    section: 'THE METHOD AT A GLANCE',
    headline: 'Split. Judge. Doubt.',
    short: 'Voice and instruments are checked separately, then fused into one honest confidence.',
    detail:
      'Know-Ta splits a song into voice and instruments, checks each one, and tells you how sure it is.',
    technical:
      'HTDemucs separates stems. An EfficientNet-B0 Audio Branch analyzes the instrumental. A Bidirectional LSTM Vocal Branch analyzes prosodic features. Attention fusion learns weights alpha and beta. Monte Carlo Dropout with Temperature Scaling gives a calibrated Bayesian Confidence Score.',
    takeaway: 'TWO KINDS OF EVIDENCE, ONE HONEST CONFIDENCE SCORE.',
    steps: [
      { label: 'Split', short: 'HTDemucs separates voice from instruments.' },
      { label: 'Judge', short: 'One branch listens to each part.' },
      { label: 'Fuse', short: 'Attention decides which part to trust more.' },
      { label: 'Doubt', short: '20 passes turn doubt into a percentage.' }
    ],
    hotspots: [
      'DEMUCS SPLIT',
      'AUDIO BRANCH',
      'VOCAL BRANCH',
      'ATTENTION FUSION',
      'CONFIDENCE SCORE',
      'CONFLICT FLAG',
    ],
    hotspotDetails: [
      {
        name: 'DEMUCS SPLIT',
        line1: 'HTDemucs separates the song into vocal and instrumental stems.',
        line2: 'Isolates vocal cues from accompaniment so each can be evaluated independently.',
      },
      {
        name: 'AUDIO BRANCH',
        line1: 'An EfficientNet-B0 Audio Branch analyzes the instrumental track.',
        line2: 'Extracts spectral timbre and synthetic artifacts from the accompaniment.',
      },
      {
        name: 'VOCAL BRANCH',
        line1: 'A Bidirectional LSTM Vocal Branch analyzes prosodic features.',
        line2: 'Tracks pitch contours, vibrato, and breathing dynamics in singing.',
      },
      {
        name: 'ATTENTION FUSION',
        line1: 'Attention fusion learns weights alpha and beta to balance stems.',
        line2: 'Prioritizes whichever branch provides stronger, more reliable evidence.',
      },
      {
        name: 'CONFIDENCE SCORE',
        line1: 'Monte Carlo Dropout with Temperature Scaling gives calibrated uncertainty.',
        line2: 'Runs 20 stochastic forward passes to quantify honest model doubt.',
      },
      {
        name: 'CONFLICT FLAG',
        line1: 'Warns when the vocal and instrumental branches disagree.',
        line2: 'Flags hybrid tracks where synthetic vocals are placed over human stems.',
      },
    ],
    tags: [
      'AUDIO BRANCH / EFFICIENTNET-B0',
      'VOCAL BRANCH / BI-LSTM',
      'FUSION / ATTENTION',
      'CONFIDENCE / MC DROPOUT',
    ],
  },
  {
    id: 'S07',
    chapter: 'ch1',
    section: '1.2 Statement of the Problem, 1.3 Hypotheses',
    headline: 'Four questions.',
    detail: 'Each question has a rule set before any data is run.',
    technical: 'Pre-registered hypotheses with testable criteria for each research question.',
    takeaway: 'Every claim can be rejected, and we report it if it is.',
    flipCards: [
      {
        question:
          'How accurate is Know-Ta on held-out songs and on generators not used in training?',
        shortQuestion: 'How accurate on unseen generators?',
        shortHypothesis: 'Strong on familiar data, lower on unseen generators.',
        hypothesis:
          'Macro F1 of at least 0.80 on the internal test partition (a starting target), and a lower score on unseen Echoes generators, with a measurable drop.',
      },
      {
        question: 'Do separation, a vocal branch, and attention actually help?',
        shortQuestion: 'Do splitting, the voice branch, and attention help?',
        shortHypothesis: 'The full system beats each simpler variant.',
        hypothesis:
          'The full system beats the Full Mix Baseline, the Concatenation Variant, and Audio only. Each part is tested separately and may be rejected.',
      },
      {
        question: 'Can users trust the confidence percentages?',
        shortQuestion: 'Can we trust the percentages?',
        shortHypothesis: 'Calibration improves, and doubt is higher on errors.',
        hypothesis:
          'Temperature Scaling lowers calibration error, and uncertainty is larger on wrong predictions.',
      },
      {
        question: 'Does it warn when voice and instruments disagree?',
        shortQuestion: 'Does it flag disagreement?',
        shortHypothesis: 'It fires more on mixed songs.',
        hypothesis:
          'The conflict flag fires more on mixed clips than on matching controls.',
      },
    ],
  },
  {
    id: 'S08',
    chapter: 'ch1',
    section: 'SCOPE',
    headline: "Clear limits.",
    detail: 'Clear limits make the results fair to read.',
    technical: 'Scope covers specific datasets, languages, and evaluation conditions only.',
    takeaway: 'CLEAR LIMITS MAKE THE RESULTS FAIR TO READ.',
    covers: [
      'English songs with singing',
      'SONICS, FMA, and Echoes data',
      'Full system and two variants',
      'A free web prototype',
    ],
    doesNotCover: [
      'Filipino songs',
      'Instrumental-only songs',
      'Legal proof',
      'Commercial use',
    ],
  },
  {
    id: 'S09',
    chapter: 'ch2',
    section: 'RELATED LITERATURE',
    headline: 'What we built on.',
    detail: 'Each design choice traces back to a paper, with its limits noted.',
    technical: 'Literature review mapped to design decisions, with stated limitations.',
    takeaway: 'EVERY DESIGN CHOICE TRACES BACK TO EVIDENCE, WITH ITS LIMITS STATED.',
    litNodes: [
      {
        topic: 'GENERATION',
        detail1: 'AI music is more realistic and varied [3]-[7]',
        detail2: 'The detector must handle realistic vocals and full mixes.',
        sources: [3, 4, 5, 6, 7],
      },
      {
        topic: 'DETECTION',
        detail1: 'Detectors degrade under simple changes and on new generators [15], [19]',
        detail2: 'We test on held-out generators and report the drop.',
        sources: [15, 19],
      },
      {
        topic: 'SEPARATION',
        detail1: 'HTDemucs splits stems [24]; separate-then-detect can lose cues [29]',
        detail2: 'We test separation with a Full Mix Baseline.',
        sources: [24, 29],
      },
      {
        topic: 'SPECTRAL',
        detail1: 'EfficientNet-B0 is light; evidence is from speech [25], [38]',
        detail2: 'Used as a light baseline, not claimed best.',
        sources: [25, 38],
      },
      {
        topic: 'VOCAL',
        detail1:
          'Bidirectional LSTMs fit timing cues [26], [27]; the breathing-pause idea is from speech [17]',
        detail2: 'A hypothesis we test with pre-set rules.',
        sources: [17, 26, 27],
      },
      {
        topic: 'ATTENTION',
        detail1:
          'Attention weights branches by content [28]; theory supports multimodal gains under assumptions [42]',
        detail2: 'Compared directly with plain concatenation.',
        sources: [28, 42],
      },
      {
        topic: 'UNCERTAINTY',
        detail1: 'MC Dropout [30] and Temperature Scaling [31]',
        detail2:
          'Calibrated percentages, 20 passes, checked with calibration metrics.',
        sources: [30, 31],
      },
      {
        topic: 'DATA',
        detail1: 'SONICS fake songs [32], FMA [49], Echoes [33]',
        detail2: 'Legal, documented, and tested for shortcuts.',
        sources: [32, 33, 49],
      },
    ],
  },
  {
    id: 'S10',
    chapter: 'ch2',
    section: 'THE DATA',
    headline: 'Tested on the unheard.',
    short: 'AI songs: SONICS\nHuman songs: FMA\nLocked test: Echoes',
    detail:
      'AI songs from SONICS, human songs from FMA, and a separate locked test from Echoes.',
    technical:
      'SONICS fake songs (Suno, Udio) are the AI class. FMA Creative Commons clips are the human class, with each track\u2019s license logged. Echoes (4,468 AI tracks from 12 providers plus 300 human reference tracks) is used only for cross-platform testing and never for training, validation, or threshold tuning. Ten providers are unseen generators (3,868 AI tracks, about 93% of that set).',
    takeaway: 'CLEAN, REPRODUCIBLE, AND HONEST ABOUT LIMITS.',
    pipelineChips: [
      { label: '30 S MIDDLE CLIP' },
      { label: 'MP3 128 KBPS' },
      { label: 'VOCAL AND ENGLISH FILTER' },
      { label: 'GENRE MATCHED' },
      { label: 'SHORTCUT CHECK' },
      { label: '22,050 HZ' },
      { label: '-23 LUFS' },
    ],
    pipelineNote:
      'SONICS HUMAN SONGS ARE NOT USED: THEY ARE COPYRIGHTED YOUTUBE LINKS AND MANY NO LONGER WORK.',
  },
  {
    id: 'S11',
    chapter: 'ch2',
    section: 'THEORETICAL FRAMEWORK',
    headline: 'Three ideas.',
    detail: 'Bayesian doubt, attention weighting, and two views of the same song.',
    technical:
      'Monte Carlo Dropout for uncertainty, attention fusion for dynamic branch weighting, and dual-branch multimodal evidence combination.',
    takeaway: 'DOUBT, WEIGHTING, AND TWO VIEWS MAKE THE VERDICT MORE HONEST.',
    illustrationLabel: 'ILLUSTRATION',
  },
  {
    id: 'S12',
    chapter: 'ch2',
    section: 'CONCEPTUAL FRAMEWORK',
    headline: 'In. Process. Out.',
    detail: 'One direction, from raw audio to a readable report.',
    technical:
      'End-to-end pipeline from data ingestion through HTDemucs, dual-branch inference, attention fusion, and calibrated output generation.',
    takeaway: 'ONE DIRECTION, FROM RAW AUDIO TO A READABLE REPORT.',
    stages: [
      {
        label: 'Input',
        items: ['SONICS, FMA, Echoes'],
      },
      {
        label: 'Process',
        items: ['Split, judge, fuse, doubt'],
      },
      {
        label: 'Output',
        items: ['Verdict, confidence, conflict flag'],
      },
    ],
  },
  {
    id: 'S13',
    chapter: 'method',
    section: 'THE REPORT',
    headline: 'The report.',
    short: 'Drop a song in.',
    detail: 'Drop a song into the printer. A report prints out.',
    technical:
      'Demo output showing label, Bayesian confidence, per-branch scores, and conflict flag.',
    takeaway: 'A VERDICT, A CONFIDENCE, AND A WARNING WHEN THE EVIDENCE DISAGREES.',
    illustrationLabel: 'DEMO OUTPUT, NOT A RESULT',
    receiptFooter: 'ESTIMATE ONLY. NOT PROOF OF AUTHORSHIP.',
    receiptPresets: [
      {
        id: 'human',
        label: 'HUMAN-LIKE',
        songTitle: 'DEMO TRACK 01 (HUMAN-LIKE)',
        aiProbability: 8,
        spreadPlusMinus: 3,
        audioPct: 10,
        vocalPct: 6,
        conflict: 'NONE',
        hasConflict: false,
      },
      {
        id: 'ai',
        label: 'AI-LIKE',
        songTitle: 'DEMO TRACK 02 (AI-LIKE)',
        aiProbability: 94,
        spreadPlusMinus: 4,
        audioPct: 96,
        vocalPct: 91,
        conflict: 'NONE',
        hasConflict: false,
      },
      {
        id: 'conflict',
        label: 'CONFLICT',
        songTitle: 'DEMO TRACK 03 (CONFLICT HYBRID)',
        aiProbability: 62,
        spreadPlusMinus: 15,
        audioPct: 90,
        vocalPct: 15,
        conflict: 'YES (GAP 0.75 > 0.30 THRESHOLD)',
        hasConflict: true,
        conflictGap: 0.75,
        conflictThreshold: 0.30,
      },
    ],
  },
];

export const qna: QnAItem[] = [
  {
    question: 'Why FMA for human songs?',
    answer:
      'SONICS human songs are copyrighted YouTube links and many are dead. FMA tracks carry Creative Commons licenses that we log per track.',
  },
  {
    question: 'Why Echoes as the test?',
    answer:
      'Its AI tracks are built to resemble its human references, so shortcuts are harder. It is never used for training or tuning.',
  },
  {
    question: 'Why split with Demucs first?',
    answer:
      'Each branch gets cleaner evidence. But separation can hide cues [29], so a Full Mix Baseline tests whether it helps.',
  },
  {
    question: 'What if the Vocal Branch does not help?',
    answer:
      'We set rules in advance (Vocal only Macro F1 at least 0.60 on validation, mean beta at least 0.10). If it fails, we report a negative result and try Mel frames once.',
  },
  {
    question: 'Why EfficientNet-B0?',
    answer:
      'It is light enough for a CPU web app. The evidence comes from speech, so we call it supporting, not conclusive.',
  },
  {
    question: 'How trustworthy are the percentages?',
    answer:
      '20 Monte Carlo passes plus Temperature Scaling, checked with calibration error, Brier score, and reliability diagrams. We expect worse calibration on Echoes.',
  },
  {
    question: 'Is this proof a song is AI?',
    answer: 'No. It is a probabilistic estimate and not legal evidence.',
  },
  {
    question: 'Why only English?',
    answer: 'The datasets are English. Filipino songs are future work.',
  },
  {
    question: 'Why no Davao source?',
    answer:
      'None was found, so we used national and international evidence. A local survey is a future step.',
  },
  {
    question: 'Why could Echoes scores be lower?',
    answer:
      'Echoes is built to be hard. Lower scores than the internal test are expected and are not by themselves a failure.',
  },
];

export const SCENE_COUNT = scenes.length;

export const CHAPTER_LABELS: Record<Chapter, string> = {
  ch1: 'Ch. 1',
  ch2: 'Ch. 2',
  method: 'Method',
};
