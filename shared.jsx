// shared.jsx — small shared components

const Logo = ({ size = 28 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, fontFamily: 'var(--serif)', fontSize: size, lineHeight: 1, letterSpacing: '-0.02em' }}>
    <span style={{ fontStyle: 'italic' }}>Versus</span>
    <span style={{ fontFamily: 'var(--mono)', fontSize: size * 0.32, color: 'var(--accent)', letterSpacing: '0.1em', transform: 'translateY(-0.4em)', display: 'inline-block' }}>v.1</span>
  </div>
);

const TopBar = ({ onHome, showNew, onNew, step, totalSteps }) => (
  <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250, 248, 243, 0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--rule-soft)' }}>
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', height: 60 }}>
      <button onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <Logo size={24} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {step !== undefined && totalSteps && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{
                width: i === step ? 24 : 8,
                height: 4,
                borderRadius: 999,
                background: i <= step ? 'var(--ink)' : 'var(--rule)',
                transition: 'all 0.4s ease',
              }} />
            ))}
          </div>
        )}
        {showNew && (
          <button className="btn ghost sm" onClick={onNew}>
            <span>＋</span> New comparison
          </button>
        )}
      </div>
    </div>
  </div>
);

// Typewriter — types text char by char
const Typewriter = ({ text, speed = 22, onDone, showCaret = true, startDelay = 0 }) => {
  const [shown, setShown] = React.useState('');
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    setShown('');
    setDone(false);
    let i = 0;
    let timeout;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setShown(text.slice(0, i));
        if (i < text.length) {
          timeout = setTimeout(tick, speed + Math.random() * 12);
        } else {
          setDone(true);
          onDone && onDone();
        }
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, [text]);

  return (
    <span>
      {shown}
      {showCaret && !done && <span className="caret" />}
    </span>
  );
};

// Animated number that counts up
const CountUp = ({ to, duration = 1200, decimals = 0, suffix = '' }) => {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{v.toFixed(decimals)}{suffix}</span>;
};

// Source pill (hover to "view source")
const SourceCite = ({ n, host, title, date }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <sup style={{
        fontFamily: 'var(--mono)',
        fontSize: 10,
        fontWeight: 500,
        padding: '2px 5px',
        marginLeft: 2,
        borderRadius: 4,
        background: open ? 'var(--ink)' : 'var(--paper-3)',
        color: open ? 'var(--paper)' : 'var(--ink-2)',
        cursor: 'help',
        transition: 'all 0.15s ease',
        verticalAlign: 'super',
      }}>{n}</sup>
      {open && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: '10px 12px',
          borderRadius: 8,
          width: 240,
          fontSize: 12,
          lineHeight: 1.4,
          fontFamily: 'var(--sans)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
          zIndex: 100,
          textAlign: 'left',
        }}>
          <div className="mono" style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            {host} · {date}
          </div>
          <div style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 14 }}>{title}</div>
          <span style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '6px solid transparent',
            borderTopColor: 'var(--ink)',
          }} />
        </span>
      )}
    </span>
  );
};

Object.assign(window, { Logo, TopBar, Typewriter, CountUp, SourceCite });
