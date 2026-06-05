import 'reflect-metadata';
import { PlanExecute, primitive, decomposition, recordExample } from '@opensymbolicai/core';

const ACRONYMS: Record<string, string> = {
  AAD: 'adjoint algorithmic differentiation',
  CBBC: 'callable bull/bear contract',
  CDRAN: 'callable daily range accrual note',
  CDXIG: 'CDX investment grade index',
  CGMY: 'Carr-Geman-Madan-Yor model',
  CLN: 'credit linked note',
  CMBX: 'commercial mortgage-backed securities index',
  CVA: 'credit valuation adjustment',
  DV01: 'dollar value of one basis point',
  DVA: 'debt valuation adjustment',
  DRAN: 'daily range accrual note',
  EFFR: 'effective federal funds rate',
  EONIA: 'euro overnight index average',
  GCF: 'general collateral financing',
  ITRAXX: 'international index of credit default swaps',
  KIKO: 'knock-in knock-out',
  NDFs: 'non-deliverable forwards',
  OBPI: 'option-based portfolio insurance',
  OIS: 'overnight indexed swap',
  PRDC: 'power reverse dual currency note',
  PVBP: 'price value of a basis point',
  SABRW: 'SABR model with weights',
  SARON: 'Swiss average rate overnight',
  SHIBOR: 'Shanghai interbank offered rate',
  SOFR: 'secured overnight financing rate',
  SONIA: 'sterling overnight index average',
  SSR: 'skew stickiness ratio',
  STRIP: 'separate trading of registered interest and principal',
  SWAPTION: 'swap option',
  TARN: 'targeted accrual redemption note',
  TBA: 'to-be-announced',
  TONAR: 'Tokyo overnight average rate',
  VANNA: 'vega-delta sensitivity',
  VOMMA: 'vega-gamma sensitivity',
};

const DEFINITIONS: Record<string, string> = {
  'adjoint algorithmic differentiation': 'a technique that accelerates sensitivity calculations in derivatives pricing',
  'callable bull/bear contract': 'a leveraged structured product tracking an underlying asset that can be called early',
  'callable daily range accrual note': 'a note that accrues interest only on days the underlying stays within a set range, and can be called by the issuer',
  'CDX investment grade index': 'a credit default swap index tracking the credit risk of investment-grade North American companies',
  'Carr-Geman-Madan-Yor model': 'an option pricing model that captures jumps and heavy tails in asset returns',
  'credit linked note': 'a structured product that combines a bond with a credit default swap on a reference entity',
  'commercial mortgage-backed securities index': 'an index tracking the credit risk of pools of commercial real estate loans',
  'credit valuation adjustment': "an adjustment to a derivative's fair value to account for the risk that a counterparty may default",
  'dollar value of one basis point': 'how much a fixed-income position gains or loses when yields move by one hundredth of a percent',
  'debt valuation adjustment': 'an adjustment reflecting the risk that the derivative writer itself may default',
  'daily range accrual note': 'a structured note that pays interest only for each day the underlying rate stays within a predefined band',
  'effective federal funds rate': 'the volume-weighted median rate on overnight unsecured borrowing between US banks',
  'euro overnight index average': 'the former overnight benchmark rate for euro interbank lending, replaced by EUR-STR in 2022',
  'general collateral financing': 'a repurchase agreement where the borrower can deliver any high-quality security as collateral',
  'international index of credit default swaps': 'a family of benchmark indices tracking credit risk across European, Asian, and other markets',
  'knock-in knock-out': 'an exotic option that activates only if the underlying hits one barrier and cancels if it hits another',
  'non-deliverable forwards': 'currency forward contracts that settle in a major currency rather than the restricted local currency',
  'option-based portfolio insurance': "a strategy protecting a portfolio's downside by combining risky assets with put options",
  'overnight indexed swap': 'an interest rate swap where one leg pays a fixed rate and the other pays compounded overnight rates',
  'power reverse dual currency note': 'a structured bond that pays high foreign-currency coupons converted back at a leveraged exchange rate',
  'price value of a basis point': "the change in a bond's price for a one basis point move in its yield",
  'SABR model with weights': 'an extension of the SABR volatility model that fits the observed volatility surface more accurately',
  'Swiss average rate overnight': 'Switzerland\'s risk-free overnight lending rate, secured by Swiss franc repurchase agreements',
  'Shanghai interbank offered rate': 'the benchmark interest rate for short-term lending between banks in China',
  'secured overnight financing rate': 'the US risk-free overnight rate based on Treasury repo transactions, replacing USD LIBOR',
  'sterling overnight index average': "the UK's risk-free overnight rate for unsecured sterling lending between banks",
  'skew stickiness ratio': 'a measure of how much implied volatility shifts when the spot price moves',
  'separate trading of registered interest and principal': 'a zero-coupon security created by stripping the coupons from a Treasury bond',
  'swap option': 'the right, but not the obligation, to enter into an interest rate swap at a future date',
  'targeted accrual redemption note': 'a structured note that redeems early once cumulative coupon payments hit a preset target',
  'to-be-announced': 'a forward market for mortgage-backed securities where the specific bonds are identified just before settlement',
  'Tokyo overnight average rate': 'Japan\'s risk-free overnight rate based on actual unsecured call money market transactions',
  'vega-delta sensitivity': "a second-order derivative measuring how a position's delta changes as implied volatility moves",
  'vega-gamma sensitivity': "a second-order derivative measuring how a position's vega changes as implied volatility moves",
};

const REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(ACRONYMS).map(([k, v]) => [v, k])
);

function similarity(a: string, b: string): number {
  a = a.toLowerCase(); b = b.toLowerCase();
  const la = a.length, lb = b.length;
  const dp = Array.from({ length: la + 1 }, (_, i) =>
    Array.from({ length: lb + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= la; i++)
    for (let j = 1; j <= lb; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return 1 - dp[la][lb] / Math.max(la, lb);
}

function getCloseMatch(term: string, candidates: string[], cutoff = 0.6): string | null {
  let best: string | null = null, bestScore = -1;
  for (const c of candidates) {
    const score = similarity(term, c);
    if (score >= cutoff && score > bestScore) { best = c; bestScore = score; }
  }
  return best;
}

export class Glossary extends PlanExecute {
  @primitive({ readOnly: true, docstring: 'Expand a finance acronym to its full form.' } as any)
  expand(acronym: string): string {
    const full = ACRONYMS[acronym];
    if (!full) throw new Error(`Unknown acronym: ${acronym}`);
    return full;
  }

  @primitive({ readOnly: true, docstring: 'Define a full financial term in plain words.' } as any)
  define(term: string): string {
    const meaning = DEFINITIONS[term];
    if (!meaning) throw new Error(`No definition for: ${term}`);
    return meaning;
  }

  @primitive({ readOnly: true, docstring: 'Return the acronym for a given full financial term using fuzzy matching.' } as any)
  abbreviate(term: string): string {
    const hit = getCloseMatch(term, Object.keys(REVERSE));
    if (!hit) throw new Error(`No acronym found for: ${term}`);
    return REVERSE[hit];
  }

  @primitive({ readOnly: true, docstring: 'Phrase an acronym, its full form, and its meaning as one sentence.' } as any)
  phrase(acronym: string, full: string, meaning: string): string {
    return `${acronym} (${full}): ${meaning}`;
  }

  @decomposition(
    'what does CVA mean?',
    recordExample((s: any) => {
      s.full = s.expand('CVA');
      s.meaning = s.define(s.full);
      s.cvaResult = s.phrase('CVA', s.full, s.meaning);
      return s.cvaResult;
    }),
    "A finance acronym can't be defined directly. Expand it to its full form first, then define that full form, then phrase the acronym, full form, and meaning together into one answer."
  )
  _exampleCva() {}

  @decomposition(
    'what is the acronym for Carr-Geman-Madan-Yor model?',
    recordExample((s: any) => {
      s.acronym = s.abbreviate('Carr-Geman-Madan-Yor model');
      s.meaning = s.define('Carr-Geman-Madan-Yor model');
      s.cgmyResult = s.phrase(s.acronym, 'Carr-Geman-Madan-Yor model', s.meaning);
      return s.cgmyResult;
    }),
    'When given a full term rather than an acronym, the lookup runs in reverse. Abbreviate the full term to find its acronym, define the full term directly, then phrase the acronym, full form, and meaning together.'
  )
  _exampleCgmyReverse() {}
}
