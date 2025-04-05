import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './assets/logo.jpg';
import auto from './assets/auto.jpg';
import planoSaude from './assets/planodesaude.jpg';
import parceirosBanner from './assets/parceiros.jpg';
import { Helmet } from 'react-helmet';
import { FaWhatsapp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import PoliticaPrivacidade from './PoliticaPrivacidade';

function Home() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('https://formspree.io/f/mleqnpra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(response => {
      setLoading(false);
      if (response.ok) {
        setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' });
        setFormData({ nome: '', email: '', mensagem: '' });
      } else {
        setStatus({ type: 'danger', message: 'Erro ao enviar mensagem. Tente novamente.' });
      }
    });
  };

  const whatsappLink = "https://wa.me/5511943510382?text=Ol%C3%A1!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

  document.documentElement.style.scrollBehavior = "smooth";

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      <Helmet>
        <title>JRX Galasse Corretora de Seguros</title>
        <meta name="description" content="Corretora de seguros confiável com planos personalizados." />
        <meta name="keywords" content="seguros, corretora, seguro auto, seguro vida, seguro empresarial" />
        <meta property="og:title" content="JRX Galasse Corretora de Seguros" />
        <meta property="og:description" content="Seguros personalizados para você, sua família ou empresa." />
        <meta property="og:image" content="https://www.seusite.com/imagem.jpg" />
        <meta property="og:url" content="https://www.seusite.com" />
        <meta name="geo.region" content="BR-SP" />
        <meta name="geo.placename" content="São Paulo" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}</script>
      </Helmet>

      <a href={whatsappLink} className="whatsapp-float" target="_blank" rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25d366',
          color: 'white', borderRadius: '50%', width: '60px', height: '60px', textAlign: 'center',
          fontSize: '30px', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
        <FaWhatsapp />
      </a>

      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" height="100" />
          </a>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#servicos">Serviços</a></li>
              <li className="nav-item"><a className="nav-link" href="#parceiros">Parceiros</a></li>
              <li className="nav-item"><a className="nav-link" href="#sobre">Sobre</a></li>
              <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Proteção e Confiança com a JRX Galasse</h1>
          <p className="lead">Sua corretora de seguros confiável. Planos personalizados para você, sua família ou empresa.</p>
          <a href="#contato" className="btn btn-light btn-lg mt-3">Fale Conosco</a>
        </div>
      </header>

      <section className="py-4">
        <div className="container">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={planoSaude} alt="Primeiro slide" />
              <Carousel.Caption><h5>Confiança e Segurança</h5></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={auto} alt="Segundo slide" />
              <Carousel.Caption><h5>Planos sob medida</h5></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>

      <section id="servicos" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Nossos Serviços</h2>
          <div className="row">
            {[{ titulo: "Seguro Auto", descricao: "Proteja seu carro com os melhores planos." },
              { titulo: "Seguro Vida", descricao: "Segurança para você e sua família." },
              { titulo: "Seguro Empresarial", descricao: "Soluções para o seu negócio." },
            ].map((servico, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{servico.titulo}</h5>
                    <p className="card-text">{servico.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="parceiros" className="py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Nossos Parceiros</h2>
          <img src={parceirosBanner} alt="Banner de Parceiros" className="img-fluid" />
        </div>
      </section>

      <section id="sobre" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Sobre a JRX Galasse</h2>
          <p className="mx-auto" style={{ maxWidth: "700px" }}>
            Com anos de experiência no mercado, oferecemos soluções de seguros personalizadas. Nosso compromisso é com a sua segurança e satisfação.
          </p>
        </div>
      </section>

      <section id="contato" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Fale Conosco</h2>
          <form className="mx-auto" style={{ maxWidth: "600px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" name="nome" placeholder="Nome" className="form-control" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <textarea name="mensagem" placeholder="Mensagem" className="form-control" rows="5" value={formData.mensagem} onChange={handleChange} required />
            </div>
            <input type="hidden" name="_cc" value={formData.email} />
            {status.message && (
              <div className={`alert alert-${status.type}`} role="alert">{status.message}</div>
            )}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-primary text-white text-center py-3">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} JRX Galasse Corretora de Seguros. Todos os direitos reservados.</p>
          <Link to="/politica-de-privacidade" className="text-white text-decoration-underline">Política de Privacidade</Link>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      </Routes>
    </Router>
  );
}

export default App;