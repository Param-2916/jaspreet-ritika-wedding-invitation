import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowDownRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  MessageCircle,
  Music2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import './style.css';

const WEDDING_DATE = new Date('2026-11-15T00:00:00+05:30').getTime();
const MUSIC_VOLUME = 0.75;
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const RSVP_MESSAGE = "Hello! We are delighted to celebrate Jaspreet and Ritika's wedding. Please count us in!";
const INVITATION_VERSE = [
  'ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
  '',
  'ਸਤਿਗੁਰੂ ਦਾਤੇ ਕਾਜ ਰਚਾਇਆ ਆਪਣੀ ਮਿਹਰ ਕਰਾਈ।',
  'ਦਾਸਾਂ ਕਾਰਜ ਆਪ ਸਵਾਰੇ ਇਹ ਉਸ ਦੀ ਵਡਿਆਈ ॥',
].join('\n');
const FAMILY_INFORMATION = 'Nanke & Dadke';

const celebrations = [
  { day: 'FRIDAY', date: '13', month: 'NOVEMBER 2026', name: 'Sukhmani Sahib Path', time: '10:00 AM', place: 'Family Residence' },
  { day: 'FRIDAY', date: '13', month: 'NOVEMBER 2026', name: 'Haldi', time: '4:00 PM', place: 'Family Residence' },
  { day: 'SATURDAY', date: '14', month: 'NOVEMBER 2026', name: 'Jago', time: '7:00 PM', place: 'Family Residence' },
  { day: 'SUNDAY', date: '15', month: 'NOVEMBER 2026', name: 'Sehra Bandi', time: '9:00 AM', place: 'Family Residence' },
  { day: 'SUNDAY', date: '15', month: 'NOVEMBER 2026', name: 'Departure of Barat', time: '10:00 AM', place: 'Leaving for Pearl Green Palace' },
  { day: 'SUNDAY', date: '15', month: 'NOVEMBER 2026', name: 'Wedding Ceremony', place: 'Pearl Green Palace' },
];

const galleryPhotos = [
  { title: 'A moment together', description: 'Pre-wedding photograph placeholder' },
  { title: 'In the golden hour', description: 'Pre-wedding photograph placeholder' },
  { title: 'Before forever', description: 'Pre-wedding photograph placeholder' },
];

function Monogram({ className = '' }) {
  const [imageAvailable, setImageAvailable] = useState(true);

  return imageAvailable ? (
    <img
      className={className}
      src={assetUrl('assets/jr-monogram.png')}
      alt="J and R monogram"
      onError={() => setImageAvailable(false)}
    />
  ) : (
    <span className={`text-monogram ${className}`} aria-label="J and R monogram">J<span>&amp;</span>R</span>
  );
}

function Intro({ onEnter, onExitComplete, isLeaving }) {
  return (
    <section
      className={`intro-screen${isLeaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'intro-exit') onExitComplete();
      }}
    >
      <div className="intro-grain" />
      <div className="intro-frame">
        <p className="intro-wordmark">SAANJH <span>·</span> A PUNJABI WEDDING STORY</p>
        <Monogram className="intro-monogram" />
        <p className="intro-instruction">A celebration of love, family &amp; tradition</p>
        <button className="intro-enter" onClick={onEnter}>
          OPEN INVITATION <ArrowDown size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function SiteHeader({ onToggleMusic, musicPlaying, isLocked }) {
  return (
    <header className="topbar" inert={isLocked}>
      <a href="#home" className="brand" aria-label="Saanjh home">
        <Monogram className="brand-mark" />
        <span>SAANJH</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#invitation">Invitation</a>
        <a href="#events">Celebrations</a>
        <a href="#gallery">Gallery</a>
        <a href="#venue">Venue</a>
        <a href="#rsvp">RSVP</a>
      </nav>
      <button className="header-music" onClick={onToggleMusic} aria-label={musicPlaying ? 'Pause music' : 'Play music'}>
        <Music2 size={15} aria-hidden="true" /> <span>{musicPlaying ? 'Pause music' : 'Play music'}</span>
      </button>
    </header>
  );
}

function Hero({ isEntering }) {
  return (
    <section className={`hero${isEntering ? ' is-entering' : ''}`} id="home">
      <div className="hero-curtain hero-curtain-left" />
      <div className="hero-curtain hero-curtain-right" />
      <div className="haveli-door" aria-hidden="true"><div className="door-light" /></div>
      <div className="hero-inner">
        <p className="eyebrow">A CELEBRATION OF LOVE &amp; TRADITION</p>
        <Monogram className="hero-mark" />
        <p className="hero-kicker">WITH THE BLESSINGS OF OUR FAMILIES</p>
        <h1>Jaspreet Singh <span>&amp;</span> Ritika</h1>
        <p className="punjabi" lang="pa">ਜਸਪ੍ਰੀਤ ਸਿੰਘ ਅਤੇ ਰਿਤਿਕਾ</p>
        <div className="gold-rule" />
        <p className="hero-date">15 <span>·</span> NOVEMBER <span>·</span> 2026</p>
        <a className="hero-scroll" href="#invitation">DISCOVER OUR STORY <ArrowDown size={14} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, detail, titleId }) {
  return (
    <div className="section-heading">
      <p className="section-label">{eyebrow}</p>
      <span className="heading-star" aria-hidden="true">✧</span>
      <h2 id={titleId}>{title}</h2>
      {detail && <p className="section-detail">{detail}</p>}
    </div>
  );
}

function Invitation() {
  return (
    <section className="invitation section" id="invitation">
      <SectionHeading eyebrow="A FORMAL INVITATION" title="With joy in our hearts" detail="Together with our families, we invite you to share in our wedding celebration." />
      <article className="parchment-card">
        <div className="card-border">
          <p className="card-small-title">THE BLESSINGS OF THE ALMIGHTY</p>
          <p className="invitation-verse" lang="pa">{INVITATION_VERSE}</p>
          <div className="card-rule" />
          <p className="card-inviting">Mrs. Surinder Kaur &amp; Mr. Balbir Singh</p>
          <p className="card-subline">request the honour of your presence at the wedding of</p>
          <h3>Jaspreet Singh <span>&amp;</span> Ritika</h3>
          <p className="card-punjabi" lang="pa">ਜਸਪ੍ਰੀਤ ਸਿੰਘ ਅਤੇ ਰਿਤਿਕਾ</p>
          <div className="card-rule" />
          <p className="family-copy"><strong>In heavenly blessings</strong><br />Late Sardarni Sham Kaur &amp; Late Sardar Ajit Singh</p>
          <p className="family-copy bride-copy">Ritika, daughter of Smt. Kiran &amp; Sh. Upinder Kumar of Nangal (Ropar).</p>
          <div className="family-listing"><span>W.B.C.F.:</span><p>{FAMILY_INFORMATION}</p></div>
          <p className="card-date">15 NOVEMBER 2026</p>
        </div>
      </article>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = WEDDING_DATE - now;
  const values = remaining <= 0
    ? null
    : [
        ['DAYS', Math.floor(remaining / 86400000)],
        ['HOURS', Math.floor(remaining / 3600000) % 24],
        ['MINUTES', Math.floor(remaining / 60000) % 60],
        ['SECONDS', Math.floor(remaining / 1000) % 60],
      ];

  return (
    <section className="countdown-section section">
      <p className="section-label">UNTIL WE SAY “I DO”</p>
      {values ? (
        <div className="countdown" aria-label="Countdown to 15 November 2026">
          {values.map(([label, value]) => (
            <div className="count-unit" key={label}>
              <strong>{String(value).padStart(2, '0')}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      ) : <p className="countdown-passed">The celebrations are underway.</p>}
    </section>
  );
}

function Events() {
  return (
    <section className="events section" id="events">
      <SectionHeading eyebrow="SAVE THE DATES" title="Wedding Celebrations" detail="Three days together, surrounded by family and tradition." />
      <div className="event-list">
        {celebrations.map((event, index) => (
          <article className="event-row" key={`${event.date}-${event.name}`}>
            <div className="event-date"><span>{event.day}</span><strong>{event.date}</strong><small>{event.month}</small></div>
            <div className="event-info">
              <h3>{event.name}</h3>
              {event.time && <p className="event-time">{event.time}</p>}
              <p className="event-place"><MapPin size={14} aria-hidden="true" />{event.place}</p>
            </div>
            <span className="event-index">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function PhotoPlaceholder({ photo, className = '' }) {
  return (
    <div className={`photo-placeholder ${className}`}>
      <span className="photo-placeholder-number" aria-hidden="true">SAANJH · 0{galleryPhotos.indexOf(photo) + 1}</span>
      <Camera size={30} strokeWidth={1} aria-hidden="true" />
      <span className="photo-placeholder-title">{photo.title}</span>
      <span className="photo-placeholder-note">{photo.description}</span>
    </div>
  );
}

function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    const closeOnKey = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length);
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current + 1) % galleryPhotos.length);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnKey);
    };
  }, [selectedIndex]);

  const showPrevious = () => {
    setSelectedIndex((current) => (current - 1 + galleryPhotos.length) % galleryPhotos.length);
  };
  const showNext = () => {
    setSelectedIndex((current) => (current + 1) % galleryPhotos.length);
  };

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <SectionHeading eyebrow="BEFORE THE BIG DAY" title="A Glimpse Before Forever" detail="A few moments from the beginning of our forever." titleId="gallery-title" />
      <div className="gallery-grid">
        {galleryPhotos.map((photo, index) => (
          <button
            className={`gallery-item gallery-item-${index + 1}`}
            key={photo.title}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Open ${photo.description.toLowerCase()} ${index + 1}`}
          >
            <PhotoPlaceholder photo={photo} />
            <span className="gallery-open-label">VIEW MOMENT <ArrowDownRight size={13} aria-hidden="true" /></span>
          </button>
        ))}
      </div>
      {selectedIndex !== null && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Pre-wedding photo gallery" onClick={() => setSelectedIndex(null)}>
          <button className="lightbox-close" onClick={() => setSelectedIndex(null)} aria-label="Close gallery">
            <X size={21} aria-hidden="true" />
          </button>
          <button className="lightbox-previous" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Previous photo">
            <ChevronLeft size={25} aria-hidden="true" />
          </button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <PhotoPlaceholder photo={galleryPhotos[selectedIndex]} className="lightbox-placeholder" />
            <p className="lightbox-caption">{galleryPhotos[selectedIndex].title} <span>· {selectedIndex + 1} / {galleryPhotos.length}</span></p>
          </div>
          <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next photo">
            <ChevronRight size={25} aria-hidden="true" />
          </button>
        </div>,
        document.body,
      )}
    </section>
  );
}

function WeddingJourney() {
  return (
    <section className="journey-section section" aria-labelledby="journey-title">
      <SectionHeading eyebrow="SUNDAY · 15 NOVEMBER 2026" title="The wedding day journey" detail="From the family residence to Pearl Green Palace." titleId="journey-title" />
      <div className="journey-track">
        <article className="journey-stop">
          <span className="journey-time">9:00 AM</span><h3>Sehra Bandi</h3><p>Family Residence</p>
        </article>
        <div className="journey-connector"><span>THE BARAT DEPARTS</span><ArrowDown size={17} aria-hidden="true" /></div>
        <article className="journey-stop journey-departure">
          <span className="journey-time">10:00 AM</span><h3>Departure of Barat</h3><p>Leaving for Pearl Green Palace</p>
        </article>
        <div className="journey-connector"><span>ARRIVAL AT THE VENUE</span><ArrowDown size={17} aria-hidden="true" /></div>
        <article className="journey-stop journey-ceremony">
          <span className="journey-time">WITH BLESSINGS</span><h3>Wedding Ceremony</h3><p>Pearl Green Palace</p>
        </article>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="venue section" id="venue">
      <SectionHeading eyebrow="GATHER WITH US" title="The places that bring us together" />
      <div className="address-grid">
        <article className="address-block">
          <p className="section-label">FAMILY RESIDENCE</p>
          <h3>Where the day begins</h3>
          <p>Residence of the family,<br />Mohalla Keshgarh Sahib,<br />Sri Anandpur Sahib,<br />Rupnagar (Ropar), Punjab – 140118.</p>
        </article>
        <article className="address-block address-featured">
          <p className="section-label">WEDDING VENUE</p>
          <h3>Pearl Green Palace</h3>
          <p>Nangal–Anandpur Sahib Road,<br />Village Surewal,<br />Sri Anandpur Sahib, Punjab.</p>
        </article>
      </div>
    </section>
  );
}

function RSVP() {
  const contacts = [
    { number: '94175-57343', url: 'https://wa.me/919417557343' },
    { number: '76269-57343', url: 'https://wa.me/917626955743' },
  ];

  return (
    <section className="rsvp section" id="rsvp">
      <p className="section-label">KINDLY REPLY</p>
      <h2>We would love to celebrate with you.</h2>
      <p className="rsvp-copy">Send your family a note on WhatsApp.</p>
      <div className="rsvp-actions">
        {contacts.map(({ number, url }) => (
          <a key={number} href={`${url}?text=${encodeURIComponent(RSVP_MESSAGE)}`} target="_blank" rel="noreferrer">
            <MessageCircle size={17} aria-hidden="true" /> RSVP · {number}
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer({ isLocked }) {
  return (
    <footer className="closing" inert={isLocked}>
      <div className="closing-rule" />
      <Monogram className="closing-mark" />
      <h2>Jaspreet Singh <span>&amp;</span> Ritika</h2>
      <p className="closing-date">15 NOVEMBER 2026</p>
      <p className="closing-note">With love, from our families.</p>
      <div className="closing-rule closing-rule-bottom" />
      <small>SAANJH · A PUNJABI WEDDING STORY</small>
    </footer>
  );
}

function StudioCredit({ isLocked }) {
  return (
    <section className="studio-credit" aria-label="Wedding film studio" inert={isLocked}>
      <h2>NATIONAL VIDEO</h2>
      <p className="studio-tagline">Wedding Films &amp; Cinematic Photography</p>
      <a href="https://www.instagram.com/national_video_aps/" target="_blank" rel="noreferrer">
        <Instagram size={14} aria-hidden="true" /> @national_video_aps
      </a>
      <p className="studio-closing">Capturing moments. Creating memories.</p>
    </section>
  );
}

function MusicControls({ audioRef, audioAvailable, onAudioError, onToggleMusic, musicPlaying, muted, setMuted, isLocked }) {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    audio.volume = MUSIC_VOLUME;
    audio.muted = muted;
  }, [audioRef, audioAvailable, muted]);

  return (
    <>
      <audio ref={audioRef} src={assetUrl('assets/music.mp3')} loop preload="none" onError={onAudioError} />
      <div className="audio-controls" aria-label="Background music controls" inert={isLocked}>
        <button onClick={onToggleMusic} disabled={!audioAvailable} aria-label={musicPlaying ? 'Pause background music' : 'Play background music'} title={audioAvailable ? (musicPlaying ? 'Pause music' : 'Play music') : 'Background music is not available'}>
          <Music2 size={17} aria-hidden="true" />
        </button>
        <button onClick={() => setMuted(!muted)} disabled={!audioAvailable} aria-label={muted ? 'Unmute background music' : 'Mute background music'} title={muted ? 'Unmute music' : 'Mute music'}>
          {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const transitionStartedRef = useRef(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll('.section, .closing, .studio-credit');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const enterInvitation = () => {
    if (transitionStartedRef.current) return;
    transitionStartedRef.current = true;
    setIntroLeaving(true);
  };

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    audio.volume = MUSIC_VOLUME;
    audio.muted = muted;
    const playback = audio.play();
    if (playback) {
      playback.then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      startMusic();
    }
  };

  const openInvitation = () => {
    startMusic();
    enterInvitation();
  };

  const completeIntroExit = () => {
    setIntroVisible(false);
    if (window.scrollY > 0) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    }
  };

  return (
    <>
      {introVisible && <Intro onEnter={openInvitation} onExitComplete={completeIntroExit} isLeaving={introLeaving} />}
      <SiteHeader onToggleMusic={toggleMusic} musicPlaying={musicPlaying} isLocked={introVisible} />
      <main inert={introVisible}>
        <Hero isEntering={introLeaving} />
        <Invitation />
        <Countdown />
        <Events />
        <Gallery />
        <WeddingJourney />
        <Venue />
        <RSVP />
      </main>
      <Footer isLocked={introVisible} />
      <StudioCredit isLocked={introVisible} />
      <MusicControls
        audioRef={audioRef}
        audioAvailable={audioAvailable}
        onAudioError={() => {
          setAudioAvailable(false);
          setMusicPlaying(false);
        }}
        onToggleMusic={toggleMusic}
        musicPlaying={musicPlaying}
        muted={muted}
        setMuted={setMuted}
        isLocked={introVisible}
      />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);