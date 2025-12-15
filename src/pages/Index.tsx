import { Helmet } from 'react-helmet-async';
import GradeCalculator from '@/components/GradeCalculator';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Calculateur de Moyenne | Calcul Notes Universitaires</title>
        <meta
          name="description"
          content="Calculez facilement votre moyenne semestrielle universitaire. Entrez vos notes TD, TP, DS et Examens pour obtenir votre moyenne générale pondérée."
        />
      </Helmet>
      <GradeCalculator />
    </>
  );
};

export default Index;
