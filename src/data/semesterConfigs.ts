import { SemesterConfig, Subject } from '@/types/grades';

// Helper to create subject
const createSubject = (
  name: string, 
  formula: Subject['formula'], 
  coefficient: number
): Subject => ({
  name,
  inputs: {},
  formula,
  coefficient,
});

export const semesterConfigs: Record<string, SemesterConfig> = {
  // Première année LSE - Semestre 1
  '1lse1': {
    subjects: [
      createSubject("Principes d'économie", 'td_exam', 2.5),
      createSubject('Principes de gestion', 'td_exam', 2.5),
      createSubject('Comptabilité financière 1', 'td_exam', 2.5),
      createSubject('Analyse', 'td_exam', 2.5),
      createSubject('Statistique descriptive et calculs des probabilités', 'td_exam', 2.5),
      createSubject('Français', 'td_exam', 0.75),
      createSubject('Anglais', 'td_exam', 0.75),
      createSubject('Produits Microsoft', 'td_exam', 1),
    ],
  },

  // Première année LSE - Semestre 2
  '1lse2': {
    subjects: [
      createSubject("Principes d'économie", 'td_exam', 2.5),
      createSubject('Principes de gestion', 'td_exam', 2.5),
      createSubject('Comptabilité financière 1', 'td_exam', 2.5),
      createSubject('Analyse', 'td_exam', 2.5),
      createSubject('Statistique descriptive et calculs des probabilités', 'td_exam', 2.5),
      createSubject('Français', 'td_exam', 0.75),
      createSubject('Anglais', 'td_exam', 0.75),
      createSubject('Produits Microsoft', 'td_exam', 1),
    ],
  },

  // Première année LBC - Semestre 1
  '1lbc1': {
    subjects: [
      createSubject('Algorithmique et structure de données 1', 'td_tp_exam', 3),
      createSubject("Systèmes d'exploitation", 'ds1_exam', 1),
      createSubject('Systèmes logiques et architecture des ordinateurs', 'ds1_exam', 1),
      createSubject('Analyse', 'ds1_exam', 1),
      createSubject('Statistiques et Probabilité', 'ds1_exam', 1),
      createSubject('Principes de Gestion', 'ds1_exam', 1),
      createSubject('Comptabilité générale', 'ds1_exam', 1),
      createSubject("Développement IHM", 'tp_ds1_ds2', 2),
      createSubject("Organisation de l'Entreprise", 'ds1_ds2', 1),
      createSubject('Compétences Numériques', 'ds1_ds2', 1),
      createSubject('Business Communication', 'ds1_ds2', 1),
      createSubject("Culture d'entreprise", 'ds1_ds2', 1),
    ],
  },

  // Première année LBC - Semestre 2
  '1lbc2': {
    subjects: [
      createSubject('Algorithmique et structure de données 2', 'td_tp_exam', 3),
      createSubject('Fondements de réseaux', 'ds1_exam', 1),
      createSubject("Introduction aux systèmes d'information", 'ds1_exam', 1),
      createSubject('Logique mathématique', 'ds1_exam', 1),
      createSubject('Algèbre', 'ds1_exam', 1),
      createSubject("Le système d'information comptable", 'ds1_exam', 1),
      createSubject('Gestion financière', 'ds1_exam', 1),
      createSubject('Framework IHM', 'tp_ds1_ds2', 2),
      createSubject('Contrôle Interne', 'ds1_ds2', 1),
      createSubject('Business Communication 2', 'td_ds1_ds2', 1),
      createSubject('Techniques de Créativité', 'td_ds1_ds2', 1),
    ],
  },

  // Première année LSG - Semestre 1
  '1lsg1': {
    subjects: [
      createSubject('Anglais 1', 'td_exam', 1),
      createSubject('Produits Microsoft', 'td_exam', 1.5),
      createSubject('Principes de Gestion', 'td_exam', 2.5),
      createSubject('Comptabilité Financière 1', 'td_exam', 2.5),
      createSubject('Microéconomie', 'td_exam', 2.5),
      createSubject('Mathématiques 1', 'td_exam', 2.5),
      createSubject("Introduction au Droit", 'td_exam', 1),
      createSubject('Mathématiques Financières', 'td_exam', 1.5),
    ],
  },

  // Première année LSG - Semestre 2
  '1lsg2': {
    subjects: [
      createSubject('Principes de gestion', 'td_exam', 2.5),
      createSubject('Comptabilité financière 1', 'td_exam', 2.5),
      createSubject('Mathématiques', 'td_exam', 2.5),
      createSubject('Statistique descriptive et calculs des probabilités', 'td_exam', 2.5),
      createSubject('Macroéconomie', 'td_exam', 1.5),
      createSubject('Introduction au Droit', 'td_exam', 1),
      createSubject('Anglais', 'td_exam', 1),
      createSubject('Produits Microsoft', 'td_exam', 1.5),
    ],
  },

  // Deuxième année LSE - Semestre 1
  '2lse1': {
    subjects: [
      createSubject("Principes d'économie", 'td_exam', 2.5),
      createSubject('Principes de gestion', 'td_exam', 2.5),
      createSubject('Comptabilité financière 1', 'td_exam', 2.5),
      createSubject('Analyse', 'td_exam', 2.5),
      createSubject('Statistique descriptive et calculs des probabilités', 'td_exam', 2.5),
      createSubject('Français', 'td_exam', 0.75),
      createSubject('Anglais', 'td_exam', 0.75),
      createSubject('Produits Microsoft', 'td_exam', 1),
    ],
  },

  // Deuxième année LSE - Semestre 2
  '2lse2': {
    subjects: [
      createSubject("Économie Internationale", 'td_exam', 1.5),
      createSubject("Économie Industrielle", 'td_exam', 1.5),
      createSubject('Économie Monétaire', 'td_exam', 2),
      createSubject('Statistique Inférentielle', 'td_exam', 2),
      createSubject("Méthodologie d'élaboration d'un rapport de stage", 'td_ds1_ds2', 2),
      createSubject('Anglais', 'td_exam', 1),
      createSubject('Business Model', 'td_exam', 1.5),
      createSubject('Conjoncture et Cycles Économiques', 'td_exam', 2),
      createSubject('Marchés Financiers et Évaluation des Actifs Financiers', 'td_exam', 1.5),
    ],
  },

  // Deuxième année LBI (Business Intelligence) - Semestre 1 (same as E-Business)
  '2lbi1': {
    subjects: [
      createSubject('Programmation OO', 'td_ds1_ds2', 1.5),
      createSubject('Programmation Web 1', 'tp_ds1_ds2', 1),
      createSubject("Conception OO des Systèmes d'information", 'ds1_exam', 1),
      createSubject('Bases de données', 'ds1_exam', 1.5),
      createSubject('Statistiques inférentielles', 'ds1_exam', 1),
      createSubject("Fondements de l'IA", 'ds1_exam', 1),
      createSubject('Marketing digital', 'td_ds1_ds2', 1),
      createSubject('Economie numérique', 'ds1_exam', 1),
      createSubject('Gestion de la production', 'td_ds1_ds2', 2),
      createSubject('Atelier Python', 'ds1_ds2', 1),
      createSubject('Ethique et lois des IT', 'td_ds1_ds2', 2),
      createSubject('Projet Professionnel Personnel (PPP)', 'ds1_ds2', 1),
    ],
  },

  // Deuxième année LBI (Business Intelligence) - Semestre 2
  '2lbi2': {
    subjects: [
      createSubject('Analyse et fouille de données', 'tp_exam', 1),
      createSubject('Programmation web 2', 'tp_ds1_ds2', 1.5),
      createSubject('Théorie des graphes et recherche opérationnelle', 'td_exam', 2),
      createSubject('Atelier de Génie Logiciel (AGL)', 'ds1_ds2', 1),
      createSubject('Architecture Logicielle', 'td_exam', 1),
      createSubject('SGBD', 'tp_exam', 1),
      createSubject('Modélisation multidimensionnelle et entrepôt de données', 'td_exam', 1.5),
      createSubject('Programmation OO avancée', 'tp_ds1_ds2', 2),
      createSubject('Développement durable', 'ds1_ds2', 1),
      createSubject('Entrepreneuriat', 'ds1_ds2', 1),
      createSubject('LEADERSHIP', 'ds1_ds2', 1),
      createSubject('Développement Personnel', 'ds1_ds2', 1),
    ],
  },

  // Deuxième année LSC - Semestre 1
  '2lsc1': {
    subjects: [
      createSubject('Comptabilité Intermédiaire 1', 'td_exam', 2.5),
      createSubject('Comptabilité de Gestion', 'td_exam', 2.5),
      createSubject('IRPP/IS', 'td_exam', 2.5),
      createSubject('Anglais', 'td_exam', 1),
      createSubject("Culture d'entreprise", 'td_exam', 1.5),
      createSubject('Conférences et journées thématiques', 'ds1_ds2', 2.5),
      createSubject('Droit privé des affaires', 'td_exam', 1),
      createSubject('Gestion de trésorerie', 'td_exam', 1.5),
    ],
  },

  // Deuxième année LSC - Semestre 2
  '2lsc2': {
    subjects: [
      createSubject('Comptabilité Intermédiaire 2', 'td_exam', 2.5),
      createSubject('Contrôle Interne', 'td_exam', 2.5),
      createSubject('TVA et Droit de Consommation', 'td_exam', 2.5),
      createSubject("Méthodologie d'Élaboration d'un Stage - MERS", 'ds1_ds2', 2.5),
      createSubject('Anglais', 'td_exam', 1),
      createSubject('Développement Personnel 1', 'td_exam', 1.5),
      createSubject('Diagnostic Financier', 'td_exam', 1.5),
      createSubject("Évaluation de l'Entreprise", 'td_exam', 1),
    ],
  },

  // Deuxième année LSG - Semestre 1
  '2lsg1': {
    subjects: [
      createSubject('Fondamentaux du Management', 'td_exam', 2.5),
      createSubject('Comptabilité de gestion', 'td_exam', 2.5),
      createSubject('Fondamentaux du Marketing', 'td_exam', 2.5),
      createSubject('Anglais', 'td_exam', 1),
      createSubject("Culture d'entreprise", 'td_exam', 1.5),
      createSubject('Conférence et journées thématiques', 'ds1_ds2', 2.5),
      createSubject('Statistique Inférentielle', 'td_exam', 1),
      createSubject('Fiscalité', 'td_exam', 1.5),
    ],
  },

  // Deuxième année LSG - Semestre 2
  '2lsg2': {
    subjects: [
      createSubject("Fondamentaux de la GRH", 'td_exam', 2.5),
      createSubject('Diagnostic Financier', 'td_exam', 2.5),
      createSubject('Gestion de la production', 'td_exam', 2.5),
      createSubject("Méthodologie d'Elaboration d'un rapport de stage", 'ds1_ds2', 2.5),
      createSubject('Anglais', 'td_exam', 1),
      createSubject('Développement personnel', 'td_exam', 1.5),
      createSubject('Marchés de capitaux et instruments financiers', 'td_exam', 1.5),
      createSubject('E-Business', 'td_exam', 1),
    ],
  },

  // Terminal LSE - Semestre 1
  '3lse1': {
    subjects: [
      createSubject("Les métiers de l'économiste", 'ds1_ds2', 1),
      createSubject('Conférences carrières', 'td_ds1_ds2', 1.5),
      createSubject('Microéconomie 2', 'td_exam', 2.5),
      createSubject('Macroeconomie 2', 'td_exam', 2),
      createSubject("Histoire des faits et de la pensée économique", 'td_exam', 2),
      createSubject('Français 3', 'td_exam', 0.75),
      createSubject('Anglais 3', 'td_exam', 0.75),
      createSubject('Culture entrepreneuriale', 'ds1_exam', 1),
      createSubject('Commerce et marchés extérieurs', 'ds1_exam', 2),
      createSubject('Statistique appliquée', 'td_exam', 1.5),
    ],
  },

  // Terminal LSE - Semestre 2
  '3lse2': {
    subjects: [
      createSubject("Les métiers de l'économiste", 'ds1_ds2', 1),
      createSubject('Conférences carrières', 'td_ds1_ds2', 1.5),
      createSubject('Microéconomie 2', 'td_exam', 2.5),
      createSubject('Macroeconomie 2', 'td_exam', 2),
      createSubject("Histoire des faits et de la pensée économique", 'td_exam', 2),
      createSubject('Français 3', 'td_exam', 0.75),
      createSubject('Anglais 3', 'td_exam', 0.75),
      createSubject('Culture entrepreneuriale', 'ds1_exam', 1),
      createSubject('Commerce et marchés extérieurs', 'ds1_exam', 2),
      createSubject('Statistique appliquée', 'td_exam', 1.5),
    ],
  },

  // Terminal LBI (Business Intelligence) - Semestre 1
  '3lbi1': {
    subjects: [
      createSubject('Techniques de prévision', 'ds1_exam', 1),
      createSubject("Fondements de la théorie de décision", 'ds1_exam', 1),
      createSubject('Introduction au Big Data et Cloud', 'ds1_exam', 1.5),
      createSubject('Développement Mobile', 'ds1_ds2', 1),
      createSubject("Gestion de la technologie de l'information", 'ds1_exam', 1.5),
      createSubject("Fondamentaux de la sécurité IT", 'ds1_exam', 1),
      createSubject('Langages de Programmation évolués – BI', 'ds1_exam', 1),
      createSubject('Conception TB et scoring', 'ds1_ds2', 1),
      createSubject("Techniques d'aide à la décision", 'td_ds1_ds2', 2),
      createSubject("PSE – Politique et Stratégie d'Entreprise", 'ds1_ds2', 1),
      createSubject('Gestion de Projet', 'tp_ds1_ds2', 2),
      createSubject('Psychology and sociology for online media applications', 'ds1_ds2', 1),
    ],
  },

  // Terminal Commerce - Semestre 1
  '3com1': {
    subjects: [
      createSubject("Initiation à l'économétrie", 'td_exam', 2),
      createSubject('Finance internationale', 'td_exam', 1.5),
      createSubject('Droit du commerce international', 'td_exam', 1),
      createSubject('Politiques commerciales', 'td_exam', 2),
      createSubject("Étude de cas dans la spécialité", 'td_exam_50_50', 2.5),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Développement personnel', 'td_exam', 1.5),
      createSubject('Financement et sécurisation des opérations Import et Export', 'td_exam', 2),
      createSubject('Technique du commerce international', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Terminal Commerce - Semestre 2
  '3com2': {
    subjects: [
      createSubject('Enquête et Sondage', 'td_exam', 2.5),
      createSubject('Stratégies Internationales des Firmes', 'td_exam', 1.5),
      createSubject('Techniques Financières Internationales', 'td_exam', 2),
      createSubject('Élaboration et Validation du PFE', 'td_exam', 3),
      createSubject('Business English', 'td_exam', 1.5),
      createSubject('Analyse et Évaluation des Projets', 'td_exam', 1.5),
      createSubject('Assurance du Commerce International', 'td_exam', 2),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
      createSubject('Transport et Logistique Internationale', 'td_exam', 1.5),
    ],
  },

  // Terminal Finance - Semestre 1
  '3lfin1': {
    subjects: [
      createSubject("Initiation à l'économétrie", 'td_exam', 2),
      createSubject('Finance internationale', 'td_exam', 1.5),
      createSubject('Droit du commerce international', 'td_exam', 1),
      createSubject('Politiques commerciales', 'td_exam', 2),
      createSubject("Étude de cas dans la spécialité", 'td_exam_50_50', 2.5),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Développement personnel', 'td_exam', 1.5),
      createSubject('Financement et sécurisation des opérations Import et Export', 'td_exam', 2),
      createSubject('Technique du commerce international', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Terminal Finance - Semestre 2
  '3lfin2': {
    subjects: [
      createSubject('Ingénierie financière et modélisation', 'td_exam', 2.5),
      createSubject('Élaboration et Validation du PFE', 'td_exam', 2),
      createSubject('Comptabilité de gestion', 'td_exam', 2),
      createSubject('Analyse financière', 'td_exam', 1),
      createSubject('Législation et réglementation', 'td_exam', 1.5),
      createSubject('Audit et techniques', 'td_exam', 1.5),
      createSubject('Techniques de prévision', 'td_exam', 2),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 2),
    ],
  },

  // Terminal Marketing - Semestre 1
  '3lmk1': {
    subjects: [
      createSubject('Gestion des prix et des produits', 'td_exam', 1),
      createSubject('Stratégie marketing', 'td_exam', 1.5),
      createSubject('Recherche marketing', 'td_exam', 2),
      createSubject("Analyse du comportement du consommateur", 'td_exam', 2),
      createSubject('Études de cas en marketing', 'td_exam_50_50', 2.5),
      createSubject('Anglais appliqué au marketing 1', 'td_exam', 1),
      createSubject('Développement personnel 2', 'td_exam', 1.5),
      createSubject('Marketing international', 'td_exam', 1),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1),
      createSubject('Théorie de la décision', 'td_exam', 1.5),
    ],
  },

  // Terminal Marketing - Semestre 2
  '3lmk2': {
    subjects: [
      createSubject('Stratégies de distribution', 'td_exam', 2.5),
      createSubject('Communication marketing', 'td_exam', 2),
      createSubject("Analyse des données marketing", 'td_exam', 2),
      createSubject("Projet de fin d'études (PFE)", 'td_exam', 2.5),
      createSubject('Anglais appliqué au marketing 2', 'td_exam', 1),
      createSubject("Outils et logiciels appliqués au marketing", 'td_exam', 1.5),
      createSubject('Marchandising', 'td_exam', 2),
      createSubject('Webmarketing', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Terminal Management - Semestre 1
  '3lma1': {
    subjects: [
      createSubject('Théorie des organisations', 'td_exam', 2),
      createSubject('Analyses quantitatives et qualitatives', 'td_exam', 2.5),
      createSubject('Management de projet', 'td_exam', 1.5),
      createSubject('Management de la qualité et certification', 'td_exam', 1.5),
      createSubject('Etude de cas en management', 'td_exam_50_50', 2.5),
      createSubject('Anglais appliqué au management 1', 'td_exam', 1),
      createSubject('Développement personnel 2', 'td_exam', 1.5),
      createSubject('Management International', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1),
      createSubject('Méthodes Scientifiques de Gestion', 'td_exam', 1),
    ],
  },

  // Terminal Management - Semestre 2
  '3lma2': {
    subjects: [
      createSubject("Management de l'innovation et entrepreneuriat", 'td_exam', 1),
      createSubject("Management de la transformation digitale et systèmes d'information", 'td_exam', 1.5),
      createSubject('Management stratégique', 'td_exam', 2.5),
      createSubject('Contrôle de gestion', 'td_exam', 2.5),
      createSubject("Projet de fin d'études (PFE)", 'td_exam', 2.5),
      createSubject('Anglais appliqué au management 2', 'td_exam', 1),
      createSubject('Gestion de projet assisté par ordinateurs', 'td_exam', 1.5),
      createSubject('Business Game', 'td_exam', 1),
      createSubject("Techniques d'aide à la décision", 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1),
    ],
  },

  // Terminal Ingénierie - Semestre 1
  '3ing1': {
    subjects: [
      createSubject("Initiation à l'Econométrie", 'td_exam', 2),
      createSubject('Techniques de prévision', 'td_exam', 1.5),
      createSubject("Techniques d'optimisation", 'td_exam', 1),
      createSubject('Recherches opérationnelles', 'td_exam', 2),
      createSubject("Étude de cas dans la spécialité", 'td_exam_50_50', 2.5),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Développement personnel', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
      createSubject("Fondements et outils de l'ingénierie économique", 'td_exam', 2),
      createSubject('Outils et logiciels statistiques', 'td_exam', 1.5),
    ],
  },

  // Terminal Ingénierie - Semestre 2
  '3ing2': {
    subjects: [
      createSubject('Enquête et sondage', 'td_exam', 2.5),
      createSubject('Analyse de la conjoncture', 'td_exam', 1.5),
      createSubject('Méthodes de gestion des risques', 'td_exam', 2),
      createSubject("Élaboration et validation du PFE", 'td_exam', 3),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Analyse et évaluation des projets', 'td_exam', 1.5),
      createSubject("Économétrie des séries temporelles", 'td_exam', 2),
      createSubject('Gestion de portefeuille', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Terminal Monétique - Semestre 1
  '3mon1': {
    subjects: [
      createSubject("Initiation à l'économétrie", 'td_exam', 2),
      createSubject("Économie de la banque et de l'assurance", 'td_exam', 1.5),
      createSubject('Droit des institutions financières', 'td_exam', 1),
      createSubject('Macroéconomie monétaire', 'td_exam', 2),
      createSubject("Étude de cas dans la spécialité", 'td_exam_50_50', 2.5),
      createSubject('Développement personnel', 'td_exam', 1.5),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Analyse Technique et Trading Boursier', 'td_exam', 2),
      createSubject('Gestion de trésorerie', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Terminal Monétique - Semestre 2
  '3mon2': {
    subjects: [
      createSubject('Enquête et sondage', 'td_exam', 2.5),
      createSubject('Techniques financières actuarielles', 'td_exam', 2),
      createSubject('Finance internationale', 'td_exam', 1.5),
      createSubject("Élaboration et validation du PFE", 'td_exam', 3),
      createSubject('Business English', 'td_exam', 1),
      createSubject('Analyse et évaluation des projets', 'td_exam', 1.5),
      createSubject('Gestion des risques bancaires', 'td_exam', 2),
      createSubject('Marketing des produits bancaires et financiers', 'td_exam', 1.5),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1.5),
    ],
  },

  // Deuxième année E-Business - Semestre 1
  '2leb1': {
    subjects: [
      createSubject('Programmation OO', 'td_ds1_ds2', 1.5),
      createSubject('Programmation Web 1', 'tp_ds1_ds2', 1),
      createSubject("Conception OO des Systèmes d'information", 'ds1_exam', 1),
      createSubject('Bases de données', 'ds1_exam', 1.5),
      createSubject('Statistiques inférentielles', 'ds1_exam', 1),
      createSubject("Fondements de l'IA", 'ds1_exam', 1),
      createSubject('Marketing digital', 'td_ds1_ds2', 1),
      createSubject('Economie numérique', 'ds1_exam', 1),
      createSubject('Gestion de la production', 'td_ds1_ds2', 2),
      createSubject('Atelier Python', 'ds1_ds2', 1),
      createSubject('Ethique et lois des IT', 'td_ds1_ds2', 2),
      createSubject('Projet Professionnel Personnel (PPP)', 'ds1_ds2', 1),
    ],
  },

  // Deuxième année E-Business - Semestre 2
  '2leb2': {
    subjects: [
      createSubject('SGBD / D.B.M.S', 'tp_ds1_ds2', 1.5),
      createSubject('Programmation Web 2', 'tp_ds1_ds2', 1),
      createSubject('Programmation OO avancée', 'tp_ds1_ds2', 2),
      createSubject('Développement Durable', 'ds1_ds2', 1),
      createSubject('Entrepreneuriat', 'ds1_ds2', 1),
      createSubject('Business Communication', 'ds1_ds2', 1),
      createSubject('Développement Personnel', 'ds1_ds2', 1),
      createSubject('Recherche Opérationnelle', 'ds1_exam', 1),
      createSubject('IT Management', 'ds1_exam', 1.5),
      createSubject('Conception TB et Scoring', 'ds1_exam', 1),
      createSubject('Data Warehouse', 'ds1_exam', 1.5),
      createSubject("Génie logiciel et outils d'AGL", 'ds1_exam', 1),
      createSubject('E-Customer Relationship Management', 'ds1_exam', 1.5),
    ],
  },

  // Terminal E-Business - Semestre 1
  '3leb1': {
    subjects: [
      createSubject('Intégration Web', 'ds1_exam', 1),
      createSubject('Développement Mobile', 'ds1_exam', 1),
      createSubject('Intelligence Artificielle', 'ds1_exam', 1),
      createSubject('Analyse de données et Data Mining', 'ds1_exam', 1),
      createSubject('IT Security Fundamentals', 'ds1_exam', 1),
      createSubject('Gestion de Projet', 'tp_ds1_exam', 1.5),
      createSubject('Introduction au Big Data et Cloud', 'ds1_exam', 1),
      createSubject('Langage de programmation évolué BI', 'tp_ds1_ds2', 1.5),
      createSubject("Techniques d'aide à la décision", 'td_ds1_ds2', 1.5),
      createSubject('Initiation au Machine Learning', 'ds1_ds2', 1.5),
      createSubject('Laws and Ethics of IT', 'td_ds1_ds2', 1.5),
      createSubject('Business Computing', 'ds1_ds2', 1.5),
    ],
  },

  // Terminal LSC - Semestre 1
  '3lsc1': {
    subjects: [
      createSubject('Comptabilité avancée', 'td_exam', 3),
      createSubject('Cadre conceptuel et présentation des états financiers', 'td_exam', 2.5),
      createSubject('Contrôle de gestion', 'td_exam', 2.5),
      createSubject('Étude de cas en comptabilité', 'td_exam_50_50', 2.5),
      createSubject('Anglais appliqué à la comptabilité 1', 'td_exam', 1),
      createSubject('Développement personnel 2', 'td_exam', 1.5),
      createSubject('Comptabilité sectorielle', 'td_exam', 1),
      createSubject("Organisation comptable et systèmes d'information", 'td_exam', 1),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1),
    ],
  },

  // Terminal LSC - Semestre 2
  '3lsc2': {
    subjects: [
      createSubject('Comptabilité internationale: IFRS', 'td_exam', 3),
      createSubject('Audit', 'td_exam', 2.5),
      createSubject('Décisions financières', 'td_exam', 2.5),
      createSubject("Projet de fin d'études (PFE)", 'td_exam', 2.5),
      createSubject('Anglais appliqué à la comptabilité 2', 'td_exam', 1),
      createSubject('Logiciel de comptabilité', 'td_exam', 1.5),
      createSubject("Techniques d'analyse de la conjoncture", 'td_exam', 1),
      createSubject('Contentieux et avantages fiscaux', 'td_exam', 1),
      createSubject("Entreprise d'Entrainement Pédagogique", 'td_exam', 1),
    ],
  },
};

// Available specializations by year
export const specializationsByYear: Record<string, { id: string; name: string; icon: string }[]> = {
  '1': [
    { id: 'lse', name: 'Licence Sciences Économiques', icon: '📈' },
    { id: 'lbc', name: 'Licence Business Computing', icon: '🖥️' },
    { id: 'lsg', name: 'Licence Sciences de Gestion', icon: '📊' },
  ],
  '2': [
    { id: 'lse', name: 'Licence Sciences Économiques', icon: '📈' },
    { id: 'lbi', name: 'Licence Business Intelligence', icon: '🧠' },
    { id: 'lsg', name: 'Licence Sciences de Gestion', icon: '📊' },
    { id: 'lsc', name: 'Licence Sciences Comptables', icon: '📝' },
    { id: 'leb', name: 'E-Business', icon: '🌍' },
  ],
  '3': [
    { id: 'lse', name: 'Licence Sciences Économiques', icon: '📈' },
    { id: 'lbi', name: 'Licence Business Intelligence', icon: '🧠' },
    { id: 'lsc', name: 'Licence Sciences Comptables', icon: '📝' },
    { id: 'leb', name: 'E-Business', icon: '🌍' },
    { id: 'com', name: 'Commerce', icon: '💼' },
    { id: 'lfin', name: 'Finance', icon: '💵' },
    { id: 'lmk', name: 'Marketing', icon: '📢' },
    { id: 'lma', name: 'Management', icon: '👥' },
    { id: 'ing', name: 'Ingénierie d\'affaires', icon: '⚙️' },
    { id: 'mon', name: 'Monnaie, Banque, Finance', icon: '🏦' },
  ],
};

export const yearLabels: Record<string, string> = {
  '1': 'Première année',
  '2': 'Deuxième année',
  '3': 'Troisième année',
};
