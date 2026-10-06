// src/data/scenes.ts
// Typed scene data parsed from content/scenes.md.
// Do not hardcode copy in components - always read from here.

export type Chapter = "ch1" | "ch2" | "method";

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

// Content aligned with the live final outline on 6 October 2026.
export const scenes: SceneData[] = [
  {
    id: "S01",
    chapter: "ch1",
    section: "Title",
    headline: "Know what you’re hearing.",
    short:
      "Know-Ta!: A Dual-Branch Deep Learning Framework for Cross-Platform AI-Generated Music Detection",
    detail:
      "Know-Ta proposes a two-branch detector and a controlled evaluation on internal songs and unfamiliar generators. This is an outline proposal; training results are not supplied.",
    technical:
      "The proposed contribution is an empirical evaluation of separated accompaniment and vocal prosody under internal and external tests. Component reuse alone is not a novelty claim.",
    takeaway: "Two branches. A testable proposal. An estimate with limits.",
    authors:
      "Kent Paulo R. Delgado; Earl Josh B. Delgado; John Renan N. Labay | College of Information and Computing, University of Southeastern Philippines",
    hero: {
      label: "KNOW-TA! | OUTLINE DEFENSE PROPOSAL",
      headlineLine1: "KNOW WHAT",
      headlineLine2: "YOU’RE HEARING.",
      scriptWords: ["hearing", "streaming", "paying for", "trusting"],
      body: "Know-Ta proposes a two-branch detector and a controlled evaluation on internal songs and unfamiliar generators. This is an outline proposal; training results are not supplied.",
      exploreLink: "EXPLORE THE STUDY ↗",
      tags: [
        "AUDIO BRANCH / EFFICIENTNET-B0",
        "VOCAL BRANCH / BI-LSTM",
        "FUSION / ATTENTION",
        "CONFIDENCE / MC DROPOUT",
      ],
      bottomRow: [
        "Kent Paulo R. Delgado | Earl Josh B. Delgado | John Renan N. Labay",
        "",
        "",
      ],
      takeaway: "Two branches. A testable proposal. An estimate with limits.",
    },
  },
  {
    id: "S02",
    chapter: "ch1",
    section: "THE SCALE",
    headline: "The uploads never stop.",
    detail:
      "Deezer reported 90,000+ daily AI deliveries for June 2026. Listening-task performance and revenue projections motivate studying detection, without establishing this model’s effectiveness.",
    technical:
      "The Deezer/Ipsos survey involved 9,000 adults in eight countries, with two AI tracks and one human track. Deezer’s July 2026 announcement describes June deliveries. CISAC’s estimate is a 2028 projection under an unchanged regulatory framework.",
    takeaway: "Detection needs evidence beyond a listening test.",
    stats: [
      {
        value: "97%",
        short: "failed the three-track listening task",
        detail:
          "FAILED TO IDENTIFY ALL THREE TRACKS CORRECTLY; 9,000 ADULTS IN EIGHT COUNTRIES, DEEZER/IPSOS, NOVEMBER 2025",
        ref: "[8]",
      },
      {
        value: "90,000",
        short: "daily AI uploads reported by Deezer",
        detail:
          "90,000+ DAILY AI DELIVERIES IN JUNE 2026; OVER HALF OF NEW UPLOADS ON PEAK DAYS, NOT HALF OF STREAMS",
        ref: "[9]",
      },
      {
        value: "24%",
        short: "music-creator revenue at risk by 2028",
        detail:
          "PROJECTED REVENUE AT RISK UNDER AN UNCHANGED REGULATORY FRAMEWORK; NOT AN OBSERVED LOSS",
        ref: "[10]",
      },
    ],
    caption:
      "200+ ARTISTS SIGNED AN OPEN LETTER AGAINST THE PREDATORY USE OF AI [11]",
  },
  {
    id: "S03",
    chapter: "ch1",
    section: "1.1 Background",
    headline: "Synthetic uploads increase the need for careful review.",
    detail:
      "Large volumes of synthetic music motivate automated triage. A detector’s output remains an estimate, and economic projections are not measured losses.",
    technical:
      "CISAC/PMP projects 24% of music-creator revenues at risk by 2028 under an unchanged regulatory framework [10]. This does not mean every AI upload takes royalties from a human artist.",
    takeaway: "Support review with evidence and clear limitations.",
    illustrationLabel: "Illustration",
  },
  {
    id: "S04",
    chapter: "ch1",
    section: "CLOSER TO HOME",
    headline: "A local reason to ask better questions.",
    detail:
      "The outline connects the study to IPOPHL draft guidance and concerns voiced by Filipino artists. Its primary evaluation remains English-language singing.",
    technical:
      "The outline discusses IPOPHL’s draft guidelines and concerns in the OPM community. The study’s English-vocal scope excludes Filipino-language validation, attribution, voice identity and legal authorship decisions.",
    takeaway: "Support careful review before making an accusation.",
    homeCards: [
      {
        index: "01",
        title: "Draft copyright rules",
        short: "Draft guidance centres human contribution.",
        detail:
          "THE CITED IPOPHL GUIDANCE IS A DRAFT CENTRED ON HUMAN CONTRIBUTION; IT IS NOT A CLAIM ABOUT AN ENACTED RULE",
        refs: [20],
      },
      {
        index: "02",
        title: "AI act on the charts",
        short: "Reports discuss an AI act in Philippine charts.",
        detail:
          "AN AI ACT COVERING FILIPINO SONGS APPEARED ON THE DAILY TOP ARTISTS CHART",
        refs: [21, 22],
      },
      {
        index: "03",
        title: "Artists speak up",
        short: "Artists raise consent and identity concerns.",
        detail: "USING ARTISTS' WORK AND IDENTITY WITHOUT CONSENT IS UNETHICAL",
        refs: [23],
      },
    ],
    note: "Local motivation does not establish Filipino-language validity or legal authorship.",
  },
  {
    id: "S05",
    chapter: "ch1",
    section: "1.1 Background",
    headline: "A high lab score is only the beginning.",
    detail:
      "The study asks whether separated vocal and accompaniment evidence helps under source shift. Prior work already includes dual-stream detection, so improvement must be measured.",
    technical:
      "CLAM already combines MERT and Wav2Vec2 representations using cross-aggregation and contrastive learning [18]. Know-Ta proposes separated accompaniment features plus explicit vocal prosody; whether this choice helps is an experiment, not an established advantage.",
    takeaway:
      "Test transfer, contribution, calibration and disagreement separately.",
    illustrationLabel:
      "Illustration of the degradation reported in [15], not measured data.",
    failureCards: [
      {
        title: "Robustness",
        short: "Transformations can reduce scores.",
        detail:
          "Published work reports sensitivity to pitch changes and audio re-encoding; the effect depends on the detector and test conditions.",
        refs: "[15], [19]",
      },
      {
        title: "Vocal evidence",
        short: "Test whether singing prosody helps.",
        detail:
          "Speech-pause evidence motivates a vocal hypothesis but does not establish that AI singing lacks human cues.",
        refs: "[17], [27]",
      },
      {
        title: "Prior dual-stream work",
        short: "Two branches alone are not novel.",
        detail:
          "CLAM already combines MERT and Wav2Vec2 representations with cross-aggregation and contrastive learning. Know-Ta tests separated spectra and explicit vocal prosody.",
        refs: "[18]",
      },
      {
        title: "Unseen providers",
        short: "Evaluate transfer rather than assume it.",
        detail:
          "Echoes evaluates unfamiliar generation conditions. Source, genre, codec and duration differences also affect cross-dataset results.",
        refs: "[33]",
      },
      {
        title: "Source shortcuts",
        short: "Audit encoding, silence and overlap.",
        detail:
          "A detector may exploit bandwidth, loudness, silence or recording source when human and AI tracks come from different collections.",
        refs: "[48], [52]",
      },
    ],
  },
  {
    id: "S06",
    chapter: "ch1",
    section: "THE METHOD AT A GLANCE",
    headline: "Split the song. Compare the evidence.",
    short:
      "A proposed comparison of accompaniment spectra, vocal prosody, learned fusion and uncertainty reporting.",
    detail:
      "Both branches project to 512 dimensions. A learned two-way softmax gate forms z = αz_audio + βz_vocal, with α + β = 1. Auxiliary heads supervise branch outputs. Gate weights describe model weighting and are not explanations of musical authenticity.",
    technical:
      "Both branches project to 512 dimensions. A learned two-way softmax gate forms z = αz_audio + βz_vocal, with α + β = 1. Auxiliary heads supervise branch outputs. Gate weights describe model weighting and are not explanations of musical authenticity.",
    takeaway: "The voice may add value. The experiments must show it.",
    steps: [
      {
        label: "Split",
        short: "HTDemucs estimates vocal and accompaniment stems.",
      },
      {
        label: "Judge",
        short:
          "EfficientNet-B0 analyzes spectra; Bi-LSTM analyzes vocal features.",
      },
      {
        label: "Fuse",
        short: "A learned gate weights two 512-D embeddings.",
      },
      {
        label: "Doubt",
        short: "20 calibrated dropout passes yield a mean and pass SD.",
      },
    ],
    hotspots: [
      "DEMUCS SPLIT",
      "AUDIO BRANCH",
      "VOCAL BRANCH",
      "ATTENTION FUSION",
      "CONFIDENCE SCORE",
      "CONFLICT FLAG",
    ],
    hotspotDetails: [
      {
        name: "DEMUCS SPLIT",
        line1: "HTDemucs estimates vocals and accompaniment [24].",
        line2:
          "Separation is imperfect and may remove cues or introduce source-dependent artifacts.",
      },
      {
        name: "AUDIO BRANCH",
        line1:
          "EfficientNet-B0 processes the accompaniment mel spectrogram [25].",
        line2:
          "Its contribution is evaluated against full-mix and fused outputs.",
      },
      {
        name: "VOCAL BRANCH",
        line1:
          "Bi-LSTM processes pitch, vibrato and pause sequences [26], [27].",
        line2:
          "Evidence from speech is a motivation; usefulness for singing must be tested.",
      },
      {
        name: "ATTENTION FUSION",
        line1:
          "Learned weights α and β combine two 512-D embeddings; α + β = 1.",
        line2:
          "Compare with concatenation. A weight is not proof of branch reliability.",
      },
      {
        name: "CONFIDENCE SCORE",
        line1:
          "Validation-fitted temperatures are applied to logits in 20 dropout passes [30], [31].",
        line2:
          "Report mean P(AI) and pass SD; calibration on unseen generators is not guaranteed.",
      },
      {
        name: "CONFLICT FLAG",
        line1:
          "Flag opposite branch predictions above a validation-selected probability gap.",
        line2:
          "Disagreement can support review; it does not prove a hybrid track.",
      },
    ],
    tags: [
      "AUDIO BRANCH / EFFICIENTNET-B0",
      "VOCAL BRANCH / BI-LSTM",
      "FUSION / ATTENTION",
      "CONFIDENCE / MC DROPOUT",
    ],
  },
  {
    id: "S07",
    chapter: "ch1",
    section: "RESEARCH QUESTIONS & EVALUATION",
    headline: "Every claim needs a test.",
    detail:
      "Compare Full Mix Baseline (one seed), Audio only and Vocal only (heads from the joint run), Concatenation Variant (one seed), and full Know-Ta (three seeds). Use the same eligible songs, song-level paired intervals and seed spread. Report negative results and limitations of unequal seed budgets and capacity.",
    technical:
      "Use Accuracy, Precision, Recall, F1 and ROC AUC, plus Balanced Accuracy, Macro F1, per-provider recall and human false-positive rate. Report ECE, Brier score and reliability diagrams for calibration. Use paired song-level bootstrap intervals and seed spread, while stating that the branch-head comparison and unequal seed budgets weaken causal conclusions. Report a signed internal-minus-external metric difference in percentage points; it is not pure generator shift. Constructed hybrid/control mixes require identical remixing and re-separation, with detection and false-alarm rates reported together. Include the outline’s 64 kbps MP3 robustness check.",
    takeaway: "A negative result is still a research result.",
    flipCards: [
      {
        question: "Does detection transfer?",
        shortQuestion: "Does detection transfer?",
        hypothesis:
          "Held-out internal songs and external unseen providers; report macro metrics and provider recall.",
        shortHypothesis:
          "Internal and external metrics, with provider-level recall.",
      },
      {
        question: "Which components add value?",
        shortQuestion: "Which components add value?",
        hypothesis:
          "Compare full mix, joint audio/vocal heads, concatenation and learned fusion on the same eligible songs.",
        shortHypothesis:
          "Five rows; joint branch heads are indicative, not independent ablations.",
      },
      {
        question: "Are the probabilities reliable?",
        shortQuestion: "Are the probabilities reliable?",
        hypothesis:
          "Calibration error, Brier score, reliability diagrams and error rates at confidence cutoffs.",
        shortHypothesis:
          "ECE, Brier score, reliability diagrams and error-based uncertainty checks.",
      },
      {
        question: "Does disagreement help review?",
        shortQuestion: "Does disagreement help review?",
        hypothesis:
          "Flag constructed mixed stems and measure false alarms on consistently sourced controls.",
        shortHypothesis:
          "Mixed-stem detection and false alarms on equally remixed controls.",
      },
    ],
  },
  {
    id: "S08",
    chapter: "ch1",
    section: "SCOPE",
    headline: "Clear boundaries. Fair conclusions.",
    detail:
      "The outline’s planned five-minute upload limit and CPU target of under 60 seconds per 30-second clip are deployment targets, not measurements. Measure separation, feature extraction and all inference passes end to end. No performance results are supplied in this repository.",
    technical:
      "The outline’s planned five-minute upload limit and CPU target of under 60 seconds per 30-second clip are deployment targets, not measurements. Measure separation, feature extraction and all inference passes end to end. No performance results are supplied in this repository.",
    takeaway: "An estimated probability does not establish authorship.",
    covers: [
      "English songs with singing",
      "SONICS AI + licensed FMA human development data",
      "Five comparison rows, including joint branch heads",
      "Eligible Echoes external testing and a proposed web app",
    ],
    doesNotCover: [
      "Filipino-language validation",
      "Voice identity or legal authorship",
      "Measured CPU speed or achieved model gains",
      "Instrumental tracks in the primary fused evaluation",
    ],
  },
  {
    id: "S09",
    chapter: "ch2",
    section: "RELATED LITERATURE",
    headline: "Build on evidence. Keep its limits.",
    detail:
      "Published SpecTTTra or CLAM scores use different human audio and splits. Do not place them in a direct leaderboard beside this study unless the released model is retrained and tested under the same protocol.",
    technical:
      "Published SpecTTTra or CLAM scores use different human audio and splits. Do not place them in a direct leaderboard beside this study unless the released model is retrained and tested under the same protocol.",
    takeaway: "The contribution is what the controlled evaluation establishes.",
    litNodes: [
      {
        topic: "GENERATION",
        detail1:
          "Suno and Udio produce complete songs; generation surveys discuss realism and evaluation [3]–[7].",
        detail2:
          "The detector must be evaluated on realistic vocals and accompaniment.",
        sources: [3, 4, 5, 6, 7],
      },
      {
        topic: "DETECTION",
        detail1:
          "Prior work studies robustness and transfer; CLAM already uses two pretrained audio streams [15], [18], [19].",
        detail2:
          "No first-dual-branch claim. Published scores use different datasets and splits.",
        sources: [15, 18, 19],
      },
      {
        topic: "SEPARATION",
        detail1:
          "HTDemucs estimates stems [24]; separation can alter or remove detection cues [29].",
        detail2:
          "Compare against full mix, while acknowledging that this also changes branch count and capacity.",
        sources: [24, 29],
      },
      {
        topic: "SPECTRAL",
        detail1:
          "EfficientNet is a compact CNN family [25]; mel-based CNNs have been studied for speech deepfakes [38].",
        detail2:
          "Music performance and end-to-end CPU feasibility remain to be measured.",
        sources: [25, 38],
      },
      {
        topic: "VOCAL",
        detail1:
          "Bi-LSTMs model temporal sequences [26], [27]; speech-pause evidence motivates, but does not validate, singing detection [17].",
        detail2:
          "Use the outline’s validation checks and one fallback; report weak results.",
        sources: [17, 26, 27],
      },
      {
        topic: "ATTENTION",
        detail1:
          "Learned weighting and multimodal theory motivate fusion under assumptions [28], [42].",
        detail2:
          "Compare with concatenation. Gate weights are not explanations of authenticity.",
        sources: [28, 42],
      },
      {
        topic: "UNCERTAINTY",
        detail1:
          "MC Dropout estimates sampled-layer variation [30]; temperature scaling fits calibration on validation [31].",
        detail2:
          "Report pass SD separately from probability; external calibration is not guaranteed.",
        sources: [30, 31],
      },
      {
        topic: "DATA",
        detail1:
          "SONICS supplies AI songs [32], FMA human controls [49], Echoes external testing [33].",
        detail2:
          "Verify licenses, overlap, source shortcuts, eligible counts and access to the human references.",
        sources: [32, 33, 49],
      },
    ],
  },
  {
    id: "S10",
    chapter: "ch2",
    section: "THE DATA",
    headline: "A test beyond familiar platforms.",
    short:
      "Development: SONICS AI + FMA human\nExternal only: eligible Echoes tracks",
    detail:
      "Echoes reports 4,468 AI tracks and 300 human references. Excluding 300 Suno and 300 Udio tracks leaves 3,868 unseen-provider AI tracks: 3,868 / 4,468 = 86.6% of its AI inventory. Its nominal full-set AI share is 4,468 / 4,768 = 93.7%; the unseen-provider pool with 300 controls would be 92.8%. Neither is the share after vocal/language filtering. The 300 human references must be access-verified and matched before benchmark metrics are claimed.",
    technical:
      "Echoes reports 4,468 AI tracks and 300 human references. Excluding 300 Suno and 300 Udio tracks leaves 3,868 unseen-provider AI tracks: 3,868 / 4,468 = 86.6% of its AI inventory. Its nominal full-set AI share is 4,468 / 4,768 = 93.7%; the unseen-provider pool with 300 controls would be 92.8%. Neither is the share after vocal/language filtering. The 300 human references must be access-verified and matched before benchmark metrics are claimed.",
    takeaway: "Published inventory is not the final eligible test size.",
    pipelineChips: [
      {
        label: "30 S MIDDLE CLIP",
      },
      {
        label: "MP3 128 KBPS",
      },
      {
        label: "VOCAL AND ENGLISH FILTER",
      },
      {
        label: "GENRE MATCHED",
      },
      {
        label: "SHORTCUT CHECK",
      },
      {
        label: "22,050 HZ",
      },
      {
        label: "-23 LUFS",
      },
    ],
    pipelineNote:
      "FMA REPLACES SONICS YOUTUBE IDS. VERIFY LICENSES, ARTIST/SONG OVERLAP, SOURCE ENCODING, ELIGIBLE COUNTS AND ACCESS TO ECHOES HUMAN REFERENCES BEFORE TRAINING.",
  },
  {
    id: "S11",
    chapter: "ch2",
    section: "THEORETICAL FRAMEWORK",
    headline: "Show the score. Show the uncertainty.",
    detail:
      "The outline caches the EfficientNet backbone once per clip and repeats the downstream stochastic layers 20 times. This estimates uncertainty only for those sampled layers. Fit separate branch and fused temperatures on validation logits, apply them per pass, then average probabilities. Report pass standard deviation in percentage points; it is not a correctness confidence interval. The on-screen passes and weights are illustrations, not measurements.",
    technical:
      "The outline caches the EfficientNet backbone once per clip and repeats the downstream stochastic layers 20 times. This estimates uncertainty only for those sampled layers. Fit separate branch and fused temperatures on validation logits, apply them per pass, then average probabilities. Report pass standard deviation in percentage points; it is not a correctness confidence interval.",
    takeaway: "A confident model can still be wrong on unfamiliar music.",
    illustrationLabel: "ILLUSTRATIVE PASSES AND WEIGHTS — NOT MODEL OUTPUT",
  },
  {
    id: "S12",
    chapter: "ch2",
    section: "CONCEPTUAL FRAMEWORK",
    headline: "One recording. A readable report.",
    detail:
      "Tune the conflict gap on constructed validation mixes and freeze it before test. The provisional rule uses opposite branch classes at 0.5 and |p_audio − p_vocal| > τ, initially τ = 0.30. If vocals are absent, skip the vocal branch, set β = 0 and suppress conflict. For a song, average calibrated clip probabilities before classification and compute conflict from song-level branch scores.",
    technical:
      "Tune the conflict gap on constructed validation mixes and freeze it before test. The provisional rule uses opposite branch classes at 0.5 and |p_audio − p_vocal| > τ, initially τ = 0.30. If vocals are absent, skip the vocal branch, set β = 0 and suppress conflict. For a song, average calibrated clip probabilities before classification and compute conflict from song-level branch scores.",
    takeaway:
      "Keep learning, calibration and final testing in separate stages.",
    stages: [
      {
        label: "Input",
        items: [
          "Development: SONICS AI + FMA human",
          "External test: eligible Echoes only",
        ],
      },
      {
        label: "Process",
        items: [
          "Separate → extract → infer → fuse",
          "Calibrate on validation, then freeze",
          "Evaluate internal and external tests",
        ],
      },
      {
        label: "Output",
        items: [
          "Estimated AI probability + dropout SD",
          "Branch scores + disagreement flag",
          "Detection, calibration and robustness metrics",
        ],
      },
    ],
  },
  {
    id: "S13",
    chapter: "method",
    section: "THE REPORT",
    headline: "The proposed report.",
    short: "Choose an illustrative report. No audio is processed.",
    detail:
      "The demo applies the provisional conflict rule to fixed probabilities. “AI probability” is a model estimate of the class, not the proportion of AI content in a song. Dropout SD is pass-to-pass variation. Real temperatures, thresholds, scores, runtime and external performance remain to be measured.",
    technical:
      "The demo applies the provisional conflict rule to fixed probabilities. “AI probability” is a model estimate of the class, not the proportion of AI content in a song. Dropout SD is pass-to-pass variation. Real temperatures, thresholds, scores, runtime and external performance remain to be measured.",
    takeaway: "Probabilities support review; they do not certify authenticity.",
    illustrationLabel: "DEMO OUTPUT, NOT A RESULT",
    receiptFooter: "ILLUSTRATIVE ESTIMATE. NOT PROOF OF AUTHORSHIP.",
    receiptPresets: [
      {
        id: "human",
        label: "HUMAN-LIKE",
        songTitle: "DEMO TRACK 01 (HUMAN-LIKE)",
        aiProbability: 8,
        spreadPlusMinus: 3,
        audioPct: 10,
        vocalPct: 6,
        conflict: "NONE",
        hasConflict: false,
      },
      {
        id: "ai",
        label: "AI-LIKE",
        songTitle: "DEMO TRACK 02 (AI-LIKE)",
        aiProbability: 94,
        spreadPlusMinus: 4,
        audioPct: 96,
        vocalPct: 91,
        conflict: "NONE",
        hasConflict: false,
      },
      {
        id: "conflict",
        label: "CONFLICT",
        songTitle: "DEMO TRACK 03 (BRANCH DISAGREEMENT)",
        aiProbability: 62,
        spreadPlusMinus: 15,
        audioPct: 90,
        vocalPct: 15,
        conflict: "YES (GAP 0.75 > PROVISIONAL 0.30)",
        hasConflict: true,
        conflictGap: 0.75,
        conflictThreshold: 0.3,
      },
    ],
  },
];

export const qna: QnAItem[] = [
  {
    question: "What is the research contribution?",
    answer:
      "An empirical test of whether separated accompaniment and explicit vocal prosody improve cross-platform music detection and reporting. The component combination is a proposal; novelty and gains must be supported against related work and the comparison experiments.",
  },
  {
    question: "Why use FMA rather than SONICS human audio?",
    answer:
      "The outline uses licensed, downloadable FMA clips instead of SONICS YouTube IDs. This improves reproducibility but creates a source confound. Log licenses, preserve artist splits, match genre, normalize encoding, check bandwidth and train a shortcut classifier before claiming music cues are responsible.",
  },
  {
    question: "Is every Echoes provider unseen?",
    answer:
      "No. Suno and Udio also appear in SONICS. Report their version shift separately. The other ten providers supply 3,868 of the published 4,468 AI tracks (86.6%), before eligibility filters. Final counts must come from the actual manifest and downloaded audio.",
  },
  {
    question: "What if the 300 human references cannot be recovered?",
    answer:
      "Access and matching remain prerequisites. AI-only data can support provider recall but not a full binary benchmark or human false-positive rate. Do not claim reproduction of Echoes until its controls are recovered. A replacement human source would require a declared protocol amendment and would be a custom benchmark.",
  },
  {
    question: "What if the vocal branch is weak?",
    answer:
      "The outline checks pitch tracking and simple features first. On validation, Vocal-only Macro F1 below 0.60 or mean gate weight β below 0.10 triggers a weak-result report. A single fallback to vocal mel frames may be selected using validation only; retain and report the original result. Gate weight by itself is not evidence of usefulness.",
  },
  {
    question: "Are Audio only and Vocal only true ablations?",
    answer:
      "They are heads from the jointly trained system, so they are indicative. The full-mix and concatenation variants are separate runs. Unequal parameter counts and one-versus-three seed budgets limit causal interpretation. Stronger claims would need separately trained, capacity-aware branches and matched seed budgets.",
  },
  {
    question: "What does the reported percentage mean?",
    answer:
      "It is the estimated probability of the AI class after validation-fitted temperature scaling. It is not the fraction of a song created by AI. The standard deviation across dropout passes is a spread estimate, not a confidence interval for correctness. External calibration is evaluated separately.",
  },
  {
    question: "Does a conflict prove a hybrid song?",
    answer:
      "No. Opposite branch predictions above a tuned gap flag disagreement. Constructed mixed stems and identically remixed controls test usefulness and false alarms. Separation errors, weak vocal evidence and unfamiliar data can also cause conflict.",
  },
  {
    question: "Will it work on OPM or an ordinary CPU?",
    answer:
      "Filipino-language music is outside the primary English-vocal scope. CPU feasibility is unmeasured: the outline targets under 60 seconds per 30-second clip, including separation and all inference stages. Hardware, end-to-end latency and failures must be reported.",
  },
  {
    question: "Is this a working detector with research results?",
    answer:
      "This repository is the interactive proposal presentation. The three report presets are interface illustrations. Training, a real upload/inference backend, final dataset eligibility counts, measured calibration and experimental metrics are not supplied here.",
  },
];

export const SCENE_COUNT = scenes.length;
export const CHAPTER_LABELS: Record<Chapter, string> = {
  ch1: "Ch. 1",
  ch2: "Ch. 2",
  method: "Method",
};
