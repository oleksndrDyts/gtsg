import MainLink from 'components/MainLink.jsx';
import PageContainer from 'components/PageContainer/';

const StartPage = () => {
  return (
    <PageContainer centerContent>
      <p style={{ marginBottom: '100px' }}>Вітаю у грі, почнімо ?</p>
      <MainLink>Старт</MainLink>
    </PageContainer>
  );
};

export default StartPage;
