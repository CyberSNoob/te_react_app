import imgPageView from '../../assets/pageviews-2021.png';

export const About = () => { 
  return (
    <section className="my-8">
      <h1 className="mx-4 my-8 font-bold text-xl">About us</h1>
      <p className="mx-4 my-8">
        Trading Economics provides its users with accurate information for 196
        countries including historical data and forecasts for more than 20
        million economic indicators, exchange rates, stock market indexes,
        government bond yields and commodity prices. Our data for economic
        indicators is based on official sources, not third party data providers,
        and our facts are regularly checked for inconsistencies. Trading
        Economics has received nearly 2 billion page views from all around the
        world.
      </p>
      <img className="py-4" src={imgPageView} alt="pageviews"/>
    </section>
  );
};
