import React, { useState }from 'react';
// Re-import Link for navigation
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Import your images from the assets folder
import heroImageUrl from '../../assets/images/TUP_Background.jpg';
// import logoIconUrl from '../../assets/images/logo-icon.svg'; // Removed as requested

// ===================================
// --- NEW: Auth Panel Component (*** EDITED ***) ---
// ===================================
const AuthPanel = ({ panel, setPanel }) => {
    // State for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Form content based on 'panel' prop
    const isLogin = panel === 'login';

    const title = isLogin ? <>Welcome <span className="auth-title-highlight">Back!</span></> : <>Create <span className="auth-title-highlight">Account</span></>;
    const submitText = isLogin ? "Log In" : "Sign Up";
    const switchPrompt = isLogin ? "Don't have an account?" : "Already have an account?";
    const switchAction = isLogin ? "Register here" : "Log in here";

    // This handles the fade-in animation by changing the key
    // when the panel switches, forcing React to re-render the div.
    const formKey = isLogin ? 'login-form' : 'signup-form';

    return (
        <>
            <div 
                className={`auth-slider-overlay ${panel ? 'visible' : ''}`}
                onClick={() => setPanel(null)} // Close when clicking overlay
            ></div>
            <div className={`auth-panel ${panel ? 'visible' : ''}`}>
                <div className="auth-form-container" key={formKey}>
                    <h2 className="auth-form-title">{title}</h2>

                    {/* Sign Up specific fields */}
                    {!isLogin && (
                        <div className="auth-form-group">
                            <label className="auth-form-label" htmlFor="name">Full Name</label>
                            <input className="auth-form-input" type="text" id="name" placeholder="Juan Dela Cruz" />
                        </div>
                    )}
                    
                    <div className="auth-form-group">
                        <label className="auth-form-label" htmlFor="email">Email</label>
                        <input className="auth-form-input" type="email" id="email" placeholder="example@tup.edu.ph" />
                    </div>

                    <div className="auth-form-group">
                        <label className="auth-form-label" htmlFor="password">Password</label>
                        <div className="auth-password-wrapper">
                            <input 
                                className="auth-form-input" 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" 
                            />
                            <i 
                                className={`auth-password-icon fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>

                    {/* Login specific options */}
                    {isLogin && (
                        <div className="auth-options-row">
                            <label className="auth-checkbox-group">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <a href="#forgot" className="auth-forgot-link">Forgot Password?</a>
                        </div>
                    )}

                    <button className="auth-submit-button">
                        {submitText}
                    </button>

                    <p className="auth-switch-prompt">
                        {switchPrompt}
                        <span onClick={() => setPanel(isLogin ? 'signup' : 'login')}>
                            &nbsp;{switchAction}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
};


// ===================================
// --- Header Component ---
// ===================================
const Header = ({ setPanel }) => (
  <header className="header">
    <div className="logo">
      {/* <img src={logoIconUrl} alt="Frames Icon" className="logo-icon" /> */}
      <span>FRAMES</span>
    </div>
    <nav className="nav-links">
      {/* These are now buttons that set the panel state */}
      <button onClick={() => setPanel('login')} className="login-link">Login</button>
      <button onClick={() => setPanel('signup')} className="get-started-button">Get Started</button>
    </nav>
  </header>
);

// ===================================
// --- Hero Section (*** EDITED ***) ---
// ===================================
const HeroSection = () => ( 
  <section className="hero-section" style={{ backgroundImage: `url(${heroImageUrl})` }}>
    <div className="hero-overlay">
      <div className="hero-content">
        <h1 className="hero-title">FRA<span className="hero-title-red">MES</span></h1> {/* EDITED: Added span for 'MES' */}
        <p>
          Revolutionary campus security powered by Raspberry Pi, featuring facial recognition, gesture control, and Real-time monitoring for a safer, smarter educational environment.
        </p>
        <div className="cta-buttons">
          <Link to="/select-role" className="cta-primary">
            <i className="fas fa-lock"></i> Access Portal
          </Link>
          <button className="cta-secondary">
            <i className="fas fa-play-circle"></i> Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ===================================
// --- Features Section ---
// ===================================
const FeatureCard = ({ iconClass, title, description }) => (
    <div className="feature-card">
      <div className="icon-container">
        <i className={iconClass}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
  
const FeaturesSection = () => (
    <section className="features-section">
      <h2>Advanced Features for Campus Security</h2>
      <p className="features-subtitle">
        Our comprehensive system combines cutting-edge AI technology with reliable hardware to deliver unparalleled campus monitoring and access control capabilities.
      </p>
      <div className="features-grid">
        <FeatureCard 
          iconClass="fas fa-user-shield" 
          title="Facial Recognition" 
          description="Advanced AI-powered facial recognition for secure access control and automated attendance tracking across campus facilities."
        />
        <FeatureCard 
          iconClass="fas fa-hand-paper" 
          title="Gesture Control" 
          description="Intuitive hand gesture controls for contactless interaction with campus systems, enhancing hygiene and user experience."
        />
        <FeatureCard 
          iconClass="fas fa-video" 
          title="Real-time Monitoring" 
          description="Continuous surveillance and monitoring of campus activities with instant alerts and comprehensive security coverage."
        />
        <FeatureCard 
          iconClass="fas fa-bell" 
          title="Emergency Alerts" 
          description="Instant emergency notification system with automated threat detection and rapid response coordination capabilities."
        />
      </div>
    </section>
  );

// ===================================
// --- Main Landing Page ---
// ===================================
const LandingPage = () => {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className="landing-page">
      <Header setPanel={setActivePanel} />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <AuthPanel panel={activePanel} setPanel={setActivePanel} />
    </div>
  );
};

export default LandingPage;

