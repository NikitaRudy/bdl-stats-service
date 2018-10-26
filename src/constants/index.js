const MatchStatuses = {
    FINISHED: 'FINISHED',
};

const FaceitErrors = {
    NOT_FOUND: 'err_nf0',
};

const KProps = {
    'XP/minute': 0.002,
    'Gold/minute': 0.002,
    'Hero Damage': 0.0015,
    'Tower Damage': 0.0001,
    'Hero Healing': 0.0015,
    'Total Gold': 0.0001,
};

const FantasyPoints = Object.assign({
    Kills: 0.3,
    Deaths: 0.3,
    Assists: 0.15,
    Level: 0.05,
}, KProps);

module.exports = {
    FantasyPoints,
    KProps,
    MatchStatuses,
    FaceitErrors,
};
