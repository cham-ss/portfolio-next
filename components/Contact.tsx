'use client';

import { FormEvent, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Reveal from './Reveal';

export default function Contact() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const nomRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const sujetRef = useRef<HTMLSelectElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);

  const flashError = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.borderColor = 'rgba(255, 80, 80, 0.6)';
    el.style.boxShadow = '0 0 0 3px rgba(255, 80, 80, 0.08)';
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
    }, 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nom = nomRef.current?.value.trim() || '';
    const email = emailRef.current?.value.trim() || '';
    const message = messageRef.current?.value.trim() || '';

    if (!nom || !email || !message) {
      if (!nom) flashError(nomRef.current);
      if (!email) flashError(emailRef.current);
      if (!message) flashError(messageRef.current);
      return;
    }

    // NOTE : pas d'envoi réel pour l'instant (pas de backend).
    // Le formulaire sera branché à une vraie route API lors de l'étape suivante.
    setSubmitting(true);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setSubmitting(false);
      if (nomRef.current) nomRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
      if (sujetRef.current) sujetRef.current.value = '';
      if (budgetRef.current) budgetRef.current.value = '';
    }, 3500);
  };

  return (
    <section className="page-section" id="page-contact" data-scroll>
      <div className="page-content">
        <div className="section-header">
          <h2 className="section-title">{t('contact.title')}</h2>
          <div className="divider" />
        </div>

        <div className="contact-wrapper">
          <Reveal className="contact-info" as="div">
            <p className="contact-intro">{t('contact.intro')}</p>

            <div className="availability-badge">
              <div className="availability-dot" />
              <span>{t('contact.available')}</span>
            </div>

            <div className="contact-items">
              <a className="contact-item" href="mailto:tairouamadouchamsoudine@gmail.com">
                <div className="contact-item-icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{t('contact.email')}</span>
                  <span className="contact-item-value">tairouamadouchamsoudine@gmail.com</span>
                </div>
              </a>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fas fa-phone" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{t('contact.phone')}</span>
                  <span className="contact-item-value">+228 91660963</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{t('contact.location')}</span>
                  <span className="contact-item-value">Lomé, Togo 🇹🇬</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="fas fa-clock" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-item-label">{t('contact.availability')}</span>
                  <span className="contact-item-value">{t('contact.hours')}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="contact-form" as="form" onSubmit={handleSubmit as any}>
            <div className="form-title">
              <i className="fas fa-paper-plane" /> <span>{t('contact.formTitle')}</span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">{t('contact.name')}</label>
                <input type="text" id="nom" ref={nomRef} placeholder={t('contact.namePh')} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contact.emailLabel')}</label>
                <input type="email" id="email" ref={emailRef} placeholder={t('contact.emailPh')} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sujet">{t('contact.subject')}</label>
              <select id="sujet" ref={sujetRef} defaultValue="">
                <option value="">{t('contact.subjectPh')}</option>
                <option>{t('contact.subject1')}</option>
                <option>{t('contact.subject2')}</option>
                <option>{t('contact.subject3')}</option>
                <option>{t('contact.subject4')}</option>
                <option>{t('contact.subject5')}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">{t('contact.budget')}</label>
              <select id="budget" ref={budgetRef} defaultValue="">
                <option value="">{t('contact.budgetPh')}</option>
                <option>Moins de 500 €</option>
                <option>500 € – 1 500 €</option>
                <option>1 500 € – 5 000 €</option>
                <option>Plus de 5 000 €</option>
                <option>{t('contact.budget5')}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" ref={messageRef} placeholder={t('contact.messagePh')} />
            </div>

            <button className={`btn-submit ${success ? 'success' : ''}`} type="submit" disabled={submitting}>
              {success ? (
                <>
                  <i className="fas fa-check" /> {t('contact.sendSuccess')}
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" /> {t('contact.send')}
                </>
              )}
            </button>
          </Reveal>
        </div>
      </div>

      <footer>
        <p className="footer-left">
          © 2026 <span>Chamsoudine TAIROU</span>
        </p>
      </footer>
    </section>
  );
}
