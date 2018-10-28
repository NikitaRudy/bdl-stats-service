const MatchStatuses = {
    FINISHED: 'FINISHED',
};

const FaceitErrors = {
    NOT_FOUND: 'err_nf0',
};

const KProps = {
    'Hero Damage': 0.0000015,
    'Tower Damage': 0.0000001,
    'Hero Healing': 0.0000015,
};

const FantasyPoints = Object.assign({
    Kills: 0.3,
    Deaths: 0.3,
    Assists: 0.15,
    Level: 0.05,
    'XP/minute': 0.002,
    'Gold/minute': 0.002,
}, KProps);

module.exports = {
    FantasyPoints,
    KProps,
    MatchStatuses,
    FaceitErrors,
};
