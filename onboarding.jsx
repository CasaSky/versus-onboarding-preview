// onboarding.jsx — conversational, dynamic, with back + custom inputs

const Onboarding = ({ initialQuery, onComplete, onBack }) => {
  const [step, setStep] = React.useState(0);
  const [extraValues, setExtraValues] = React.useState([]); // Array of strings for 3rd, 4th, etc.
  const [aValue, setAValue] = React.useState('');
  const [bValue, setBValue] = React.useState('');

  // Stored answers
  const [items, setItems] = React.useState(null);          // {a, b}
  const [purpose, setPurpose] = React.useState(null);      // string
  const [purposeCustom, setPurposeCustom] = React.useState('');
  const [priorities, setPriorities] = React.useState([]);  // string[]
  const [priorityCustom, setPriorityCustom] = React.useState('');
  const [customPriorities, setCustomPriorities] = React.useState([]);
  const [depth, setDepth] = React.useState('Standard (3 min)');

  // Layer 2: AI-driven chip routing for items that don't hit a keyword profile.
  // status: 'idle' | 'loading' | 'profile' | 'custom' | 'failed'
  const [aiSuggestions, setAiSuggestions] = React.useState({ status: 'idle' });

  const [typingDone, setTypingDone] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const scrollRef = React.useRef(null);

  // Pre-fill from landing
  React.useEffect(() => {
    if (initialQuery) {
      const parts = initialQuery.split(/\s+(?:vs\.?|and|versus|or)\s+/i).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        setAValue(parts[0]);
        setBValue(parts[1]);
        if (parts.length > 2) setExtraValues(parts.slice(2));
      } else if (parts.length === 1) {
        setAValue(parts[0]);
      }
    }
  }, [initialQuery]);

  // Layer 1: keyword-based profile detection
  const keywordProfileKey = React.useMemo(() => {
    if (!items) return 'generic';
    return window.detectProfile(items.a, items.b);
  }, [items]);

  // Effective profile: keyword hit → that key. Else if AI routed to a profile → that key.
  const profileKey = React.useMemo(() => {
    if (keywordProfileKey !== 'generic') return keywordProfileKey;
    if (aiSuggestions.status === 'profile' && aiSuggestions.profileKey) {
      return aiSuggestions.profileKey;
    }
    return 'generic';
  }, [keywordProfileKey, aiSuggestions]);
  const profile = window.CATEGORY_PROFILES[profileKey];

  const isCustomMode = aiSuggestions.status === 'custom';
  // Loading state only matters when keyword missed and AI is still working it out.
  const isLoadingChips = keywordProfileKey === 'generic' && aiSuggestions.status === 'loading';

  // Suggest priorities the first time we land on the priorities step
  const [prioritiesSeeded, setPrioritiesSeeded] = React.useState(false);
  React.useEffect(() => {
    if (step !== 2 || prioritiesSeeded) return;
    if (isLoadingChips) return; // wait for AI to land

    if (isCustomMode) {
      const preselected = (aiSuggestions.priorities || [])
        .filter(p => p.confidence >= 0.7)
        .map(p => p.label);
      setPriorities(preselected);
    } else if (profile) {
      setPriorities(profile.defaults);
    }
    setPrioritiesSeeded(true);
  }, [step, isLoadingChips, isCustomMode, profile, aiSuggestions, prioritiesSeeded]);

  // Suggest purpose when arriving at purpose step
  const [purposeSeeded, setPurposeSeeded] = React.useState(false);
  React.useEffect(() => {
    if (step !== 1 || purposeSeeded) return;
    if (isLoadingChips) return;

    if (isCustomMode) {
      const top = (aiSuggestions.purposes || [])[0];
      if (top && !purpose) setPurpose(top.label);
    } else {
      const suggested = window.PROFILE_TO_PURPOSE[profileKey];
      if (suggested && !purpose) setPurpose(suggested);
    }
    setPurposeSeeded(true);
  }, [step, isLoadingChips, isCustomMode, profileKey, aiSuggestions, purpose, purposeSeeded]);

  // Reset seeding flags if items change (back-edit)
  React.useEffect(() => {
    setPrioritiesSeeded(false);
    setPurposeSeeded(false);
  }, [items]);

  // Purpose options — AI-tailored when custom, otherwise the static list with the matching one first.
  const orderedPurposeOptions = React.useMemo(() => {
    if (isCustomMode) {
      const labels = (aiSuggestions.purposes || []).map(p => p.label);
      return [...labels, 'Other'];
    }
    const all = [...window.PURPOSE_OPTIONS];
    const suggested = window.PROFILE_TO_PURPOSE[profileKey];
    if (!suggested) return all;
    return [suggested, ...all.filter(o => o !== suggested)];
  }, [isCustomMode, aiSuggestions, profileKey]);

  // Reset typewriter on step change
  React.useEffect(() => {
    setTypingDone(false);
  }, [step]);

  // Global Enter → Continue (skip if focus is in the custom-priority input)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Enter') return;
      if (e.target.tagName === 'TEXTAREA') return;
      // Custom priority field: Enter adds the chip, not advances
      if (e.target === document.querySelector('input[placeholder="Type something that matters to you…"]')) return;
      if (typingDone && q.isValid()) goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [typingDone, step, q, goNext]);

  // Auto-scroll
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history, step, typingDone]);

  // ============= Question definitions (dynamic) =============
  const QUESTIONS = [
    {
      id: 'items',
      prompt: 'What are we comparing today?',
      sub: 'Two things, three, or as many as you\'d like.',
      isValid: () => aValue.trim().length > 0 && bValue.trim().length > 0 && extraValues.every(v => v.trim().length > 0),
      summary: () => ({
        a: aValue.trim(),
        b: bValue.trim(),
        extras: extraValues.map(v => v.trim()).filter(Boolean),
      }),
      displayKind: 'items',
    },
    {
      id: 'purpose',
      prompt: () => `What's the comparison of ${items?.a || '...'} and ${items?.b || '...'} for?`,
      sub: 'Helps me weight what actually matters.',
      isValid: () => purpose && (purpose !== 'Other' || purposeCustom.trim().length > 0),
      summary: () => purpose === 'Other' ? purposeCustom.trim() : purpose,
      displayKind: 'text',
    },
    {
      id: 'priorities',
      prompt: () => `What matters most when comparing ${items?.a || '...'} and ${items?.b || '...'}?`,
      sub: () => {
        if (isLoadingChips) return `Tuning suggestions for ${items?.a || 'these items'} vs ${items?.b || ''}…`;
        if (isCustomMode) return `Tuned for these items. Pick what matters — or add your own.`;
        const cat = profile?.purposeLabel?.toLowerCase();
        if (!cat || profileKey === 'generic') return `Pick what matters — add your own if something's missing.`;
        return `Tuned for ${cat}. Pick what matters — or add your own.`;
      },
      isValid: () => priorities.length > 0,
      summary: () => priorities,
      displayKind: 'chips',
    },
    {
      id: 'depth',
      prompt: 'How deep should I go?',
      sub: 'More depth means more sources and a longer report.',
      isValid: () => !!depth,
      summary: () => depth,
      displayKind: 'text',
    },
  ];

  const q = QUESTIONS[step];
  const promptText = typeof q.prompt === 'function' ? q.prompt() : q.prompt;
  const subText = typeof q.sub === 'function' ? q.sub() : q.sub;

  const goNext = React.useCallback(() => {
    if (!q.isValid()) return;

    // Persist this step's answer
    if (q.id === 'items') {
      const newItems = {
        a: aValue.trim(),
        b: bValue.trim(),
        extras: extraValues.map(v => v.trim()).filter(Boolean),
      };
      setItems(newItems);

      // Layer 2: only fire AI when keywords don't match a profile
      const keywordKey = window.detectProfile(newItems.a, newItems.b);
      if (keywordKey === 'generic' && window.suggestProfileOrChips) {
        setAiSuggestions({ status: 'loading' });
        window.suggestProfileOrChips(newItems).then(result => {
          if (!result) {
            setAiSuggestions({ status: 'failed' });
          } else if (result.kind === 'profile') {
            setAiSuggestions({ status: 'profile', profileKey: result.key });
          } else {
            setAiSuggestions({
              status: 'custom',
              purposes: result.purposes,
              priorities: result.priorities,
            });
          }
        }).catch(() => setAiSuggestions({ status: 'failed' }));
      } else {
        setAiSuggestions({ status: 'idle' }); // keyword hit — no AI needed
      }
    }

    const summary = q.summary();
    const display = q.id === 'items' ? `${summary.a}  vs  ${summary.b}`
                  : Array.isArray(summary) ? summary.join(' · ')
                  : summary;

    setHistory(prev => {
      // Drop any history beyond current step (in case user went back and changed answer)
      const trimmed = prev.slice(0, step * 2);
      return [
        ...trimmed,
        { role: 'q', content: promptText, sub: subText },
        { role: 'a', kind: q.displayKind, payload: summary, display },
      ];
    });

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Done — assemble final answers
      const finalAnswers = {
        what: {
          a: aValue.trim(),
          b: bValue.trim(),
          extras: extraValues.map(v => v.trim()).filter(Boolean),
        },
        purpose: purpose === 'Other' ? purposeCustom.trim() : purpose,
        priorities,
        depth,
      };
        setTimeout(() => onComplete(finalAnswers), 500);
    }
  }, [aValue, bValue, extraValues, purpose, purposeCustom, priorities, depth, step, promptText, subText, onComplete]);

  const goBack = () => {
    if (step === 0) {
      onBack();
      return;
    }
    setStep(step - 1);
    // trim history
    setHistory(prev => prev.slice(0, (step - 1) * 2));
  };

  const togglePriority = (opt) => {
    setPriorities(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const addCustomPriority = () => {
    const v = priorityCustom.trim();
    if (!v) return;
    if (!customPriorities.includes(v)) {
      setCustomPriorities(prev => [...prev, v]);
    }
    if (!priorities.includes(v)) {
      setPriorities(prev => [...prev, v]);
    }
    setPriorityCustom('');
  };

  // Combined options: AI custom (if custom mode), else profile defaults, plus user-added
  const priorityOptions = (() => {
    if (isCustomMode) {
      const labels = (aiSuggestions.priorities || []).map(p => p.label);
      return [...labels, ...customPriorities.filter(c => !labels.includes(c))];
    }
    if (profile) {
      return [...profile.priorities, ...customPriorities.filter(c => !profile.priorities.includes(c))];
    }
    return customPriorities;
  })();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar onHome={onBack} step={step} totalSteps={QUESTIONS.length} />

      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto' }}>
        <div className="container" style={{ maxWidth: 760, padding: '40px 32px 200px' }}>

          <div className="fade-in" style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>A short conversation</div>
            <div className="serif italic" style={{ fontSize: 18, color: 'var(--ink-3)' }}>
              Four quick questions. About 20 seconds.
            </div>
          </div>

          {/* History */}
          {history.map((entry, i) => (
            <div key={i} style={{ marginBottom: entry.role === 'a' ? 36 : 12 }} className="fade-in">
              {entry.role === 'q' && (
                <>
                  <div className="serif" style={{ fontSize: 26, lineHeight: 1.2, color: 'var(--ink-2)' }}>
                    {entry.content}
                  </div>
                  {entry.sub && <div style={{ color: 'var(--ink-3)', fontSize: 14, marginTop: 6 }}>{entry.sub}</div>}
                </>
              )}
              {entry.role === 'a' && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 14 }}>
                  <div style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--accent)', color: 'var(--paper)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                  }}>You</div>
                  <div style={{ paddingTop: 4 }}>
                    {entry.kind === 'items' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                        <span className="serif" style={{ fontSize: 22, color: 'var(--a)' }}>{entry.payload.a}</span>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>vs</span>
                        <span className="serif" style={{ fontSize: 22, color: 'var(--b)' }}>{entry.payload.b}</span>
                        {(entry.payload.extras || []).map((ex, i) => (
                          <React.Fragment key={i}>
                            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>vs</span>
                            <span className="serif" style={{ fontSize: 22, color: 'var(--ink-2)' }}>{ex}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    ) : entry.kind === 'chips' ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {entry.payload.map(p => (
                          <span key={p} style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--paper-3)', fontSize: 13 }}>{p}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="serif" style={{ fontSize: 22 }}>{entry.display}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Current question */}
          <div key={step} className="fade-up">
            <div className="serif" style={{ fontSize: 36, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              <Typewriter text={promptText} speed={18} onDone={() => setTypingDone(true)} />
            </div>
            {subText && typingDone && (
              <div className="fade-in" style={{ color: 'var(--ink-3)', fontSize: 15, marginTop: 10 }}>
                {subText}
              </div>
            )}

            {typingDone && (
              <div className="fade-up" style={{ marginTop: 32 }}>

                {/* === Q1: items === */}
                {q.id === 'items' && (
                  <div>
                    <div className="g-vs">
                      <div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--a)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>● First</div>
                        <input autoFocus className="input" placeholder="Tokyo" value={aValue}
                          onChange={(e) => setAValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && bValue && goNext()} />
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', letterSpacing: '0.2em', alignSelf: 'center', paddingBottom: 12 }}>VS</div>
                      <div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--b)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>● Second</div>
                        <input className="input" placeholder="Seoul" value={bValue}
                          onChange={(e) => setBValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && aValue && goNext()} />
                      </div>
                    </div>

                    {/* Extra items (3rd, 4th, ...) */}
                    {extraValues.map((val, i) => {
                      const ordinal = ['Third', 'Fourth', 'Fifth', 'Sixth'][i] || `#${i + 3}`;
                      const allItems = [aValue, bValue, ...extraValues.slice(0, i)];
                      const placeholder = window.suggestNextItem ? window.suggestNextItem(profileKey, allItems) : 'Another item';
                      const dotColor = ['var(--ink-2)', 'var(--accent)', 'var(--ink-2)', 'var(--accent)'][i] || 'var(--ink-2)';
                      return (
                        <div key={i} className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end', marginTop: 18 }}>
                          <div>
                            <div className="mono" style={{ fontSize: 11, color: dotColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>● {ordinal}</div>
                            <input
                              autoFocus
                              className="input"
                              placeholder={placeholder}
                              value={val}
                              onChange={(e) => {
                                const copy = [...extraValues]; copy[i] = e.target.value; setExtraValues(copy);
                              }}
                              onKeyDown={(e) => { if (e.key === 'Enter' && q.isValid()) goNext(); }}
                            />
                          </div>
                          <button
                            className="chip"
                            onClick={() => setExtraValues(prev => prev.filter((_, idx) => idx !== i))}
                            style={{ fontSize: 12, paddingBottom: 10 }}
                            title="Remove"
                          >
                            ✕ Remove
                          </button>
                        </div>
                      );
                    })}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                      {extraValues.length < 4 && (
                        <button
                          className="chip"
                          style={{ fontSize: 12 }}
                          onClick={() => setExtraValues(prev => [...prev, ''])}
                        >
                          ＋ Add {extraValues.length === 0 ? 'a third' : 'another'}
                        </button>
                      )}
                      {extraValues.length > 0 && (
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                          Comparing <span className="mono">{2 + extraValues.length}</span> items
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* === Q2: purpose === */}
                {q.id === 'purpose' && (
                  <div>
                    {isLoadingChips ? (
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic', animation: 'fadeIn 0.4s' }}>
                        Tuning suggestions for {items?.a} vs {items?.b}…
                      </div>
                    ) : (
                      <>
                        {isCustomMode ? (
                          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 12 }}>
                            Tailored to <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{items?.a} vs {items?.b}</span>.
                          </div>
                        ) : window.PROFILE_TO_PURPOSE[profileKey] && (
                          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 12 }}>
                            Suggested: <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{window.PROFILE_TO_PURPOSE[profileKey]}</span> — change it if I got it wrong.
                          </div>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {orderedPurposeOptions.map(opt => (
                            <button key={opt}
                              className={`chip ${purpose === opt ? 'active' : ''}`}
                              style={{ fontSize: 15, padding: '10px 18px' }}
                              onClick={() => setPurpose(opt)}>
                              {purpose === opt && <span style={{ fontSize: 11 }}>✓</span>}
                              {opt}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    {purpose === 'Other' && (
                      <div className="fade-in" style={{ marginTop: 20 }}>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                          Tell me more
                        </div>
                        <input
                          autoFocus
                          className="input"
                          style={{ fontSize: 22 }}
                          placeholder="e.g. choosing a wedding venue"
                          value={purposeCustom}
                          onChange={(e) => setPurposeCustom(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && q.isValid() && goNext()}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* === Q3: priorities (DYNAMIC) === */}
                {q.id === 'priorities' && (
                  <div>
                    {isLoadingChips ? (
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic', animation: 'fadeIn 0.4s' }}>
                        Tuning suggestions for {items?.a} vs {items?.b}…
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {priorityOptions.map(opt => (
                          <button key={opt}
                            className={`chip ${priorities.includes(opt) ? 'active' : ''}`}
                            style={{ fontSize: 15, padding: '10px 18px' }}
                            onClick={() => togglePriority(opt)}>
                            {priorities.includes(opt) && <span style={{ fontSize: 11 }}>✓</span>}
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Custom priority input */}
                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--rule)' }}>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                        Add your own
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', borderBottom: '1px solid var(--rule)', paddingBottom: 4 }}>
                        <input
                          style={{
                            flex: 1, fontFamily: 'var(--serif)', fontSize: 20,
                            border: 'none', background: 'transparent', outline: 'none',
                            padding: '4px 0', color: 'var(--ink)',
                          }}
                          placeholder="Type something that matters to you…"
                          value={priorityCustom}
                          onChange={(e) => setPriorityCustom(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomPriority(); }}}
                        />
                        <button
                          className="chip"
                          onClick={addCustomPriority}
                          disabled={!priorityCustom.trim()}
                          style={{ opacity: priorityCustom.trim() ? 1 : 0.4, flexShrink: 0 }}
                        >
                          ＋ Add
                        </button>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 8 }}>
                        Press <span className="mono">↵</span> to add. You can add as many as you like.
                      </div>
                    </div>

                    {/* Selection summary */}
                    <div style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-3)' }}>
                      {priorities.length === 0
                        ? <span style={{ color: 'var(--accent)' }}>Pick at least one to continue.</span>
                        : <span><span className="mono">{priorities.length}</span> selected · I'll weight the verdict around these.</span>
                      }
                    </div>
                  </div>
                )}

                {/* === Q4: depth === */}
                {q.id === 'depth' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {["Quick take (1 min)","Standard (3 min)","Deep dive (8 min)"].map(opt => (
                      <button key={opt}
                        className={`chip ${depth === opt ? 'active' : ''}`}
                        style={{ fontSize: 15, padding: '10px 18px' }}
                        onClick={() => setDepth(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky footer with BACK + Continue */}
      {typingDone && (
        <div className="fade-in" style={{
          position: 'sticky', bottom: 0,
          background: 'linear-gradient(to top, var(--paper) 65%, transparent)',
          padding: '40px 32px 28px',
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, maxWidth: 760, padding: 0 }}>
            <button className="btn ghost sm" onClick={goBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span className="mono">←</span>
              {step === 0 ? 'Home' : 'Back'}
            </button>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {step + 1} of {QUESTIONS.length}
            </span>
            <button className="btn" onClick={goNext} disabled={!q.isValid()}
              style={{ opacity: q.isValid() ? 1 : 0.4 }}>
              {step === QUESTIONS.length - 1 ? 'Start the comparison' : 'Continue'}
              <span className="mono">↵</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

window.Onboarding = Onboarding;
