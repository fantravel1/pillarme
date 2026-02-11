const fs = require('fs');
const path = require('path');

// ============================================================
// DATA
// ============================================================
const sleeves = [
  {
    name: 'Travel Experience', slug: 'travel-experience', market: 'EN', region: 'North America',
    lifecycle: 'Growth', tam: 'Massive', monetization: 'Broad', icon: '&#9992;',
    description: 'A flagship collection of premium travel and experience domains covering destinations, accommodations, and fan-driven travel across the globe. Now a live, thriving vertical generating tens of millions of monthly views across 100+ properties worldwide.',
    domains: ['AfricanBeaches.com','AmazonSolo.com','AngolaTrip.com','BallparkFan.com','BarcelonaVibe.com','BeachSwimmer.com','BikeMontreal.com','BleacherBeds.com','CairoVibe.com','CarpoolFree.com','CelebEats.com','CelebVacations.com','ChampionshipsGuide.com','ChadTrip.com','CheapFan.com','CheapRetreats.com','CommunityHostels.com','ConcertBet.com','CougarTravel.com','CzechiaTrip.com','DayOfTheDeadTravel.com','DepartMe.com','DiasporaDays.com','DinosaurTravel.com','DormTravel.com','DownloadEat.com','DownloadHotels.com','DraculaExperience.com','EarlyNightOut.com','EcoRenter.com','EiffelTowerTravel.com','FanBookings.com','FanHaeng.com','FanHostel.com','FanPremiere.com','FantasyThemePark.com','FastConcert.com','FitnessBeaches.com','GirlFestival.com','GoToMontreal.com','HinchaViajero.com','HongKongVilla.com','HotelCarRentals.com','HotelDownload.com','HotIslands.com','HotParks.com','HotVenues.com','IntiraymiTravel.com','IslandDetox.com','ItsAdventure.com','KidHostels.com','KumbhmelaTravel.com','LimitedTicket.com','LocalWeekends.com','MobileHostel.com','MtFujiTravel.com','OttawaHolidays.com','ParkviewHotels.com','OldResorts.com','PartyBusTravel.com','PartyConcerts.com','PartyInsiders.com','PremiumTrains.com','ReggaeTravel.com','SharmElSheikhTravel.com','SoloNightOut.com','StayFanatic.com','StockholmVibe.com','SurferTours.com','TailgateExperts.com','TennisOpens.com','ThisIsAmsterdam.com','ThisIsBeijing.com','ThisIsCapeTown.com','ThisIsIstanbul.com','ThisIsVietnam.com']
  },
  {
    name: "Women's Health", slug: 'womens-health', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128150;',
    description: "Premium domains addressing the full spectrum of women's health -- from cancer prevention to hormonal wellness. This sleeve targets the rapidly growing femtech and women's health market with high-authority domain names.",
    domains: ['StopMyCancer.com','HowToBeYoung.com','ChronicSoreness.com','HormonalPain.com','PeriodGuide.com']
  },
  {
    name: "Women's Sports", slug: 'womens-sports', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127947;',
    description: "Domains capturing the explosive growth of women's athletics, from pilates and fitness to competitive basketball and running safety. This sleeve rides the wave of record-breaking viewership and investment in women's sports.",
    domains: ['GirlPilates.com','PilatesForWomen.com','FemalePosture.com','RunSafeTonight.com','HeroBasketball.com']
  },
  {
    name: "Women's Finance", slug: 'womens-finance', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128176;',
    description: "A curated collection of finance-focused domains targeting women investors, budgeters, and entrepreneurs. This sleeve addresses the growing demand for financial products and content designed specifically for women.",
    domains: ['DayInvestors.com','BankMade.com','SmallExpenses.com','BudgetBookkeepers.com','YourBestMoney.com']
  },
  {
    name: "Women's Fashion", slug: 'womens-fashion', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128087;',
    description: "Premium fashion and beauty domains spanning casual makeup to high runway culture. This sleeve captures consumer intent across the massive women's fashion vertical with brandable, memorable names.",
    domains: ['Blushless.com','SelfTailored.com','WhatsPosh.com','NYrunway.com','CasualMakeup.com']
  },
  {
    name: "Women's Luxury", slug: 'womens-luxury', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Large', monetization: 'Broad', icon: '&#128142;',
    description: "Exclusive domains targeting the ultra-premium women's lifestyle segment -- billionaire casual, wealthy shopping, and CEO style. This sleeve serves the high-net-worth female consumer with aspirational brand names.",
    domains: ['BillionaireCasual.com','WealthyShopping.com','CasualBillionaire.com','PlainRich.com','CeoCasual.com']
  },
  {
    name: "Men's Health", slug: 'mens-health', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128170;',
    description: "High-intent health domains covering critical men's wellness topics from prostate care to sports injury recovery. This sleeve addresses the underserved men's health information market with authoritative domain names.",
    domains: ['ProstateAdvice.com','HeartClot.com','FixACL.com','AchillesTear.com','HairExercises.com']
  },
  {
    name: 'New Parents', slug: 'new-parents', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#128118;',
    description: "Domains serving the new parent journey from birth planning to family activities and child nutrition. This sleeve captures the high-spending new parent demographic with practical, search-friendly names.",
    domains: ['FamilyWorkouts.com','DanceWithKids.com','HikingForKids.com','ChildsFood.com','BirthPlanNow.com']
  },
  {
    name: 'Home Cooking', slug: 'home-cooking', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127859;',
    description: "Premium culinary domains for the home cooking revolution -- from recipe storage to chef training and organic living. This sleeve taps into the massive at-home food content and commerce market.",
    domains: ['FoodWatchlist.com','LearnToChef.com','Vegmaster.com','StoreRecipe.com','OrganicStew.com']
  },
  {
    name: 'Luxury Dining', slug: 'luxury-dining', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Large', monetization: 'Broad', icon: '&#127864;',
    description: "Upscale dining and gourmet food domains targeting the premium culinary experience market. From luxury spices to chef collaborations, this sleeve serves high-end food brands and content creators.",
    domains: ['CoutureBeef.com','LuxurySpices.com','CanapeBar.com','VeganSalt.com','ChefCollabs.com']
  },
  {
    name: 'Casual Dining', slug: 'casual-dining', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127828;',
    description: "Everyday dining and affordable food domains capturing the casual restaurant and budget-friendly eating market. This sleeve serves the mass-market food discovery and dining-out audience.",
    domains: ['EatAffordably.com','YogurtGirl.com','BrunchChef.com','BarTipping.com','BudgetEspresso.com']
  },
  {
    name: 'Dating & Marriage', slug: 'dating-marriage', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#128152;',
    description: "Relationship-focused domains spanning the full dating-to-marriage journey. This sleeve captures high-intent audiences in the lucrative online dating and wedding planning verticals.",
    domains: ['RatherYou.com','ThriftyDates.com','VibeForFree.com','MarryIQ.com','BridalPic.com']
  },
  {
    name: 'Y.A. Literature', slug: 'ya-literature', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Large', monetization: 'Narrow', icon: '&#128214;',
    description: "Curated domains for the young adult literature and book-to-screen adaptation market. This sleeve serves the passionate YA reading community with niche-specific brand names.",
    domains: ['TopBookReviews.com','QueerYA.com','BookToMovies.com','Fallboys.com','ReadJaneAusten.com']
  },
  {
    name: 'NFT', slug: 'nft', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Emerging', monetization: 'Moderate', icon: '&#128279;',
    description: "Strategic domains positioned for the evolving NFT and digital collectibles market. This sleeve provides brandable entry points for NFT platforms, portfolios, and networking communities.",
    domains: ['NFTDL.com','PortfolioNFT.com','SmallNFT.com','MassNFT.com','NFTNetworking.com']
  },
  {
    name: 'Entertainment', slug: 'entertainment', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127902;',
    description: "Celebrity and entertainment industry domains covering TV, music, movies, and fan culture. This sleeve captures the enormous entertainment media audience with instantly recognizable names.",
    domains: ['TVCeleb.com','DJCeleb.com','MovieCeleb.com','FanFad.com','CelebNYC.com']
  },
  {
    name: 'Website Creation', slug: 'website-creation', market: 'EN', region: 'North America',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128187;',
    description: "Domains targeting the creator economy and website-building market -- from vlog creation to SEO growth and blogging. This sleeve serves aspiring digital entrepreneurs and content creators.",
    domains: ['CreateVlogs.com','BeginnerAEO.com','ViewsGrowth.com','TopTenBlogs.com','FavoriteImage.com']
  },
  {
    name: 'Finance (FR)', slug: 'finance-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127974;',
    description: "Domaines premium de finance et banque ciblant le march\u00e9 francophone avec l'intelligence artificielle. Cette collection couvre la banque, la comptabilit\u00e9 et les devises pour l'Afrique francophone et l'Europe.",
    domains: ['BanqueIA.com','FinancesIA.com','ComptableIA.com','MonnaieIA.com','DeviseIA.com']
  },
  {
    name: 'Law (FR)', slug: 'law-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Broad', icon: '&#9878;',
    description: "Domaines juridiques francophones couvrant le droit, les contrats et la justice. Cette collection sert les professionnels du droit et les plateformes de services juridiques en ligne dans le monde francophone.",
    domains: ['JuridiqueIA.com','Contractualiser.com','Defendeur.com','Plaignant.com','JusticeRestaurative.com']
  },
  {
    name: 'Business (FR)', slug: 'business-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Broad', icon: '&#128188;',
    description: "Domaines d'entreprise et de gestion ciblant les entrepreneurs et PME francophones. Cette collection couvre la standardisation, la syst\u00e9matisation et la responsabilisation des processus d'affaires.",
    domains: ['EntrepriseIA.com','Standardiser.com','Systematiser.com','Responsabiliser.com','Prioriser.com']
  },
  {
    name: 'Sports Media (FR)', slug: 'sports-media-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127936;',
    description: "Domaines de m\u00e9dias sportifs francophones sp\u00e9cialis\u00e9s dans le basketball. Cette collection cible les fans de basket en Afrique francophone et en Europe avec des noms d'actualit\u00e9 et de r\u00e9sultats.",
    domains: ['BasketEnDirect.com','ActualiteBasket.com','ResultatsBasket.com','HistoireDuBasket.com','ReglesDuBasket.com']
  },
  {
    name: 'Cooking (FR)', slug: 'cooking-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127858;',
    description: "Domaines culinaires francophones couvrant les techniques de cuisine essentielles. Cette collection sert le march\u00e9 de la cuisine en ligne avec des verbes d'action reconnaissables et m\u00e9morables.",
    domains: ['Mijoteuse.com','Bouillir.com','Eplucher.com','Decongeler.com','Recoudre.com']
  },
  {
    name: 'Culture (FR)', slug: 'culture-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Narrow', icon: '&#127912;',
    description: "Domaines culturels francophones capturant des concepts uniques de la culture fran\u00e7aise. Cette collection poss\u00e8de des mots culturellement riches comme Vouvoiement et Esprit d'Escalier.",
    domains: ['EspritdEscalier.com','MalDuPays.com','Vouvoiement.com','Tutoiement.com','Procrastiner.com']
  },
  {
    name: 'Women STEM (FR)', slug: 'women-stem-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128300;',
    description: "Domaines STEM f\u00e9minins francophones ciblant les femmes dans la science et la technologie. Cette collection promeut la visibilit\u00e9 des femmes en programmation, robotique et a\u00e9ronautique.",
    domains: ['Programmatrice.com','Roboticienne.com','Aeronauticienne.com','Geologiste.com','Climatologue.com']
  },
  {
    name: 'Space (FR)', slug: 'space-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Emerging', monetization: 'Moderate', icon: '&#128640;',
    description: "Domaines scientifiques francophones explorant la cosmologie, la physique subatomique et la relativit\u00e9. Cette collection sert le march\u00e9 \u00e9mergent de l'\u00e9ducation scientifique spatiale en fran\u00e7ais.",
    domains: ['Cosmologique.com','Subatomique.com','Gravitationnelle.com','Plasmique.com','Relativiste.com']
  },
  {
    name: 'Cognition (FR)', slug: 'cognition-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Narrow', icon: '&#129504;',
    description: "Domaines cognitifs francophones couvrant la r\u00e9flexion, l'analyse et la synth\u00e8se. Cette collection cible le march\u00e9 de l'\u00e9ducation et du d\u00e9veloppement personnel francophone.",
    domains: ['Reflechirai.com','Approfondir.com','Deliberer.com','Synthetiser.com','Schematiser.com']
  },
  {
    name: 'Workforce (FR)', slug: 'workforce-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#128119;',
    description: "Domaines de gestion de la main-d'oeuvre francophone couvrant la planification et la productivit\u00e9. Cette collection sert les entreprises et les RH dans le monde francophone.",
    domains: ['Prioriser.com','Planifierai.com','Systematiser.com','Standardiser.com','Responsabiliser.com']
  },
  {
    name: 'Cinema & Art (FR)', slug: 'cinema-art-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127916;',
    description: "Domaines cin\u00e9matographiques et artistiques francophones couvrant le sc\u00e9nario, la d\u00e9clamation et les arts visuels. Cette collection sert l'industrie cr\u00e9ative francophone.",
    domains: ['CinemaIA.com','Scenariser.com','Declamer.com','Esquiver.com','Gribouiller.com']
  },
  {
    name: 'Social Impact (FR)', slug: 'social-impact-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Narrow', icon: '&#127758;',
    description: "Domaines d'impact social francophones couvrant la justice, la visibilit\u00e9 et la responsabilisation. Cette collection sert les ONG, les militants et les organisations sociales francophones.",
    domains: ['JusticeRestaurative.com','Opprimer.com','Responsabiliser.com','Visibiliser.com','Debanaliser.com']
  },
  {
    name: 'Science (FR)', slug: 'science-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128300;',
    description: "Domaines scientifiques francophones couvrant les probabilit\u00e9s, la microbiologie et la biologie cellulaire. Cette collection sert le march\u00e9 de l'\u00e9ducation scientifique francophone.",
    domains: ['Probabiliste.com','Statisticienne.com','Microbienne.com','Bacterienne.com','Intercellulaire.com']
  },
  {
    name: 'Mental Health (FR)', slug: 'mental-health-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128156;',
    description: "Domaines de sant\u00e9 mentale francophones couvrant l'anxi\u00e9t\u00e9, l'apaisement et la catharsis. Cette collection sert le march\u00e9 croissant du bien-\u00eatre mental francophone.",
    domains: ['Anxieuse.com','Apaisante.com','Cathartique.com','Rassurante.com','Lucidement.com']
  },
  {
    name: 'Communication (FR)', slug: 'communication-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128172;',
    description: "Domaines de communication francophones couvrant la n\u00e9gociation, la mod\u00e9ration et la conciliation. Cette collection sert les professionnels de la communication dans le monde francophone.",
    domains: ['Vouvoiement.com','Tutoiement.com','Conciliatrice.com','Moderatrice.com','Negociatrice.com']
  },
  {
    name: 'Maker (FR)', slug: 'maker-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128295;',
    description: "Domaines du mouvement maker francophone couvrant la couture, l'\u00e9bauche et le bricolage. Cette collection sert la communaut\u00e9 cr\u00e9ative et DIY francophone.",
    domains: ['Recoudre.com','Ebaucher.com','Rappiquer.com','Barbouiller.com','Trifouiller.com']
  },
  {
    name: 'Nature (FR)', slug: 'nature-fr', market: 'FR', region: 'Francophone Africa & Europe',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127793;',
    description: "Domaines nature francophones couvrant la pollinisation, l'irrigation et la r\u00e9g\u00e9n\u00e9ration. Cette collection sert le march\u00e9 croissant de l'\u00e9cologie et du d\u00e9veloppement durable francophone.",
    domains: ['Pollinisante.com','Irriguer.com','Regenerante.com','Gaienne.com','Abondante.com']
  },
  {
    name: 'Fintech (ES)', slug: 'fintech-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128178;',
    description: "Dominios premium de fintech para el mercado hispanohablante, cubriendo banca inteligente y transferencias de dinero. Esta colecci\u00f3n captura el auge fintech en Am\u00e9rica Latina.",
    domains: ['FintechLatino.com','BancosInteligentes.com','BancoFresh.com','CreditoBueno.com','EnviarDineroMexico.com']
  },
  {
    name: 'Crypto (ES)', slug: 'crypto-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Emerging', monetization: 'Moderate', icon: '&#8383;',
    description: "Dominios cripto para el mercado mexicano y latinoamericano, cubriendo an\u00e1lisis, pesos digitales y cambio de divisas. Esta colecci\u00f3n sirve al creciente ecosistema cripto hispano.",
    domains: ['CriptoMexicano.com','CriptoPesos.com','CriptoAnalista.com','FintechMexicano.com','CambioDolarHoy.com']
  },
  {
    name: 'Finance (ES)', slug: 'finance-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127974;',
    description: "Dominios financieros en espa\u00f1ol para b\u00fasqueda de bancos, comparaci\u00f3n y protecci\u00f3n de dinero. Esta colecci\u00f3n captura intent de b\u00fasqueda financiera en Am\u00e9rica Latina.",
    domains: ['BuscarBanco.com','CompararBanco.com','EncontrarBanco.com','ProtegerMiDinero.com','BuscarDinero.com']
  },
  {
    name: 'Real Estate (ES)', slug: 'real-estate-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127968;',
    description: "Dominios inmobiliarios en espa\u00f1ol para financiamiento, remodelaci\u00f3n e inversi\u00f3n en propiedades. Esta colecci\u00f3n sirve al enorme mercado inmobiliario latinoamericano.",
    domains: ['FinanciarCasas.com','RemodelarCasas.com','HipotecaIA.com','InvertirCasa.com','PropiedadIA.com']
  },
  {
    name: 'Direct Travel (ES)', slug: 'direct-travel-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#9992;',
    description: "Dominios de viaje directo a destinos espec\u00edficos para el viajero hispanohablante. Esta colecci\u00f3n cubre NYC, Miami, Tokio, Barcelona y Ciudad de M\u00e9xico.",
    domains: ['ViajeNYC.com','ViajeMiami.com','ViajeTokio.com','ViajeBarcelona.com','ViajeCDMX.com']
  },
  {
    name: 'Open Travel (ES)', slug: 'open-travel-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127758;',
    description: "Dominios de viaje general y turismo digital para el mercado hispanohablante. Esta colecci\u00f3n captura b\u00fasquedas de viajes globales y vacaciones digitales.",
    domains: ['ViajesGlobales.com','ViajesDigitales.com','VacacionesDigitales.com','TurismoModerno.com','TurismoFeliz.com']
  },
  {
    name: 'Luxury (ES)', slug: 'luxury-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Broad', icon: '&#128142;',
    description: "Dominios de lujo en espa\u00f1ol para hoteles, resorts, joyas y marcas premium. Esta colecci\u00f3n sirve al creciente mercado de lujo en M\u00e9xico y Am\u00e9rica Latina.",
    domains: ['MexicoDeLujo.com','HotelesLujosos.com','ResortDeLujo.com','JoyaDeLujo.com','MarcaLujo.com']
  },
  {
    name: 'Weddings (ES)', slug: 'weddings-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#128141;',
    description: "Dominios de bodas en espa\u00f1ol para compras, tiendas y planificaci\u00f3n nupcial. Esta colecci\u00f3n captura el lucrativo mercado de bodas hispanohablante.",
    domains: ['ComprarBoda.com','TiendaBoda.com','BuscarBoda.com','BodaDeLujo.com','BodaModerna.com']
  },
  {
    name: 'Food (ES)', slug: 'food-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127860;',
    description: "Dominios de comida y delivery en espa\u00f1ol con inteligencia artificial. Esta colecci\u00f3n sirve al enorme mercado de delivery y recetas en Am\u00e9rica Latina.",
    domains: ['DeliveryComida.com','AntojoYa.com','HambreYa.com','ComidaIA.com','RecetaIA.com']
  },
  {
    name: 'Health (ES)', slug: 'health-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128154;',
    description: "Dominios de salud en espa\u00f1ol para consultas m\u00e9dicas, diagn\u00f3sticos y terapia. Esta colecci\u00f3n captura la demanda de salud digital en Am\u00e9rica Latina.",
    domains: ['ConsultarDoctor.com','EncontrarDoctor.com','DiagnosticoOnline.com','EspecialistaMedico.com','EncontrarTerapia.com']
  },
  {
    name: 'Fitness (ES)', slug: 'fitness-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#127947;',
    description: "Dominios de fitness y nutrici\u00f3n en espa\u00f1ol con IA y resultados visibles. Esta colecci\u00f3n sirve al mercado de bienestar f\u00edsico hispanohablante.",
    domains: ['RutinasEjercicios.com','EjercicioIA.com','NutricionDigital.com','CambiarDieta.com','VerResultados.com']
  },
  {
    name: 'Education (ES)', slug: 'education-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#127891;',
    description: "Dominios educativos en espa\u00f1ol para cursos, t\u00edtulos y edtech. Esta colecci\u00f3n captura la demanda de educaci\u00f3n en l\u00ednea en Am\u00e9rica Latina.",
    domains: ['BuscarCurso.com','TituloOnline.com','TituloEnLinea.com','EdtechLatino.com','EducacionMovil.com']
  },
  {
    name: 'Video Games (ES)', slug: 'video-games-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#127918;',
    description: "Dominios de videojuegos y esports en espa\u00f1ol para el mercado latino. Esta colecci\u00f3n sirve a la comunidad gamer hispanohablante con nombres reconocibles.",
    domains: ['GamingLatino.com','EsportsLatino.com','VideoJuegosMexico.com','JuegoOnlineGratis.com','JugarGratisOnline.com']
  },
  {
    name: 'Gaming (ES)', slug: 'gaming-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127922;',
    description: "Dominios de gaming y casinos digitales en espa\u00f1ol. Esta colecci\u00f3n captura el mercado de juegos en l\u00ednea y aplicaciones m\u00f3viles en Am\u00e9rica Latina.",
    domains: ['CasinosDigitales.com','JuegoHoy.com','JuegoParaJugar.com','JuegosDeAndroid.com']
  },
  {
    name: 'Fandom (ES)', slug: 'fandom-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#11088;',
    description: "Dominios de chisme y entretenimiento de celebridades en espa\u00f1ol. Esta colecci\u00f3n captura el enorme mercado de noticias de famosos en Am\u00e9rica Latina.",
    domains: ['TodoChisme.com','ChismeVIP.com','ChismeExclusivo.com','ChismeTV.com','NoticiasEstrellas.com']
  },
  {
    name: 'Scholarships (ES)', slug: 'scholarships-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127891;',
    description: "Dominios de becas en espa\u00f1ol para j\u00f3venes, mujeres y estudios en el extranjero. Esta colecci\u00f3n sirve la alta demanda de becas en Am\u00e9rica Latina.",
    domains: ['BuscarBecas.com','BecasYa.com','BecasJovenes.com','BecasMujeres.com','BecaCanada.com']
  },
  {
    name: 'Employment (ES)', slug: 'employment-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128188;',
    description: "Dominios de empleo y servicios en espa\u00f1ol con IA. Esta colecci\u00f3n captura la b\u00fasqueda de trabajo y servicios en Am\u00e9rica Latina.",
    domains: ['ChambaIA.com','TrabajoPerfecto.com','TrabajoCool.com','ServicioBueno.com','ServicioGratis.com']
  },
  {
    name: 'Mexico Slang (ES)', slug: 'mexico-slang-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Narrow', icon: '&#127797;',
    description: "Dominios de slang mexicano y cultura callejera para contenido aut\u00e9ntico. Esta colecci\u00f3n captura la identidad cultural mexicana con nombres reconocibles y virales.",
    domains: ['Chingarle.com','Naquear.com','Pisteando.com','PochoProud.com','ChaleWey.com']
  },
  {
    name: 'Mental Health (ES)', slug: 'mental-health-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128156;',
    description: "Dominios de salud mental y bienestar emocional en espa\u00f1ol. Esta colecci\u00f3n sirve al creciente mercado de bienestar mental en Am\u00e9rica Latina.",
    domains: ['Relajarme.com','Calmarme.com','Inspirarme.com','Aceptarme.com','PonerseFeliz.com']
  },
  {
    name: 'Girl Power (ES)', slug: 'girl-power-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#128170;',
    description: "Dominios de empoderamiento femenino en espa\u00f1ol para la mujer latina. Esta colecci\u00f3n inspira fuerza, seguridad y liderazgo con nombres poderosos.",
    domains: ['SerJefa.com','SerGuerrera.com','SerHeroina.com','SentirseSegura.com','HacersePoderosa.com']
  },
  {
    name: 'Tacos (ES)', slug: 'tacos-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127790;',
    description: "Dominios dedicados a la cultura del taco mexicano. Esta colecci\u00f3n sirve al mercado de comida mexicana aut\u00e9ntica con nombres memorables y divertidos.",
    domains: ['TacoOriginal.com','TacoAutentico.com','BuscarTaco.com','TacoFacil.com','DejarLosTacos.com']
  },
  {
    name: 'Nature (ES)', slug: 'nature-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Moderate', icon: '&#129417;',
    description: "Dominios de naturaleza y fauna sagrada latinoamericana. Esta colecci\u00f3n captura el misticismo de animales emblem\u00e1ticos como el quetzal, jaguar y \u00e1guila.",
    domains: ['QuetzalSagrado.com','JaguarSagrado.com','AguilaSagrada.com','AxolotlSagrado.com','MariposaSagrada.com']
  },
  {
    name: 'Cuisines (ES)', slug: 'cuisines-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127869;',
    description: "Dominios de cocinas internacionales en espa\u00f1ol, desde comida callejera hasta kosher y peruana. Esta colecci\u00f3n sirve la diversidad culinaria del mercado hispanohablante.",
    domains: ['ComidaCallejera.com','ComidaKosher.com','ComidaPeruana.com','ComidaCaribena.com','ComidaAfricana.com']
  },
  {
    name: 'Food Apps (ES)', slug: 'food-apps-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128241;',
    description: "Dominios de aplicaciones de comida y compras en espa\u00f1ol. Esta colecci\u00f3n captura la demanda de delivery y compras de alimentos en l\u00ednea en Am\u00e9rica Latina.",
    domains: ['AntojoYa.com','HambreYa.com','ComerTodo.com','QueComprarHoy.com','OrganicoYa.com']
  },
  {
    name: 'Nightlife (ES)', slug: 'nightlife-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Large', monetization: 'Moderate', icon: '&#127863;',
    description: "Dominios de vida nocturna y bebidas en espa\u00f1ol, desde tequila hasta micheladas. Esta colecci\u00f3n sirve la vibrante cultura de bebidas latinoamericana.",
    domains: ['TequilaYa.com','CervezaIA.com','BebidaFria.com','Micheladita.com','Pulquecito.com']
  },
  {
    name: 'Medicine (ES)', slug: 'medicine-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#127807;',
    description: "Dominios de medicina tradicional y remedios naturales en espa\u00f1ol. Esta colecci\u00f3n captura la rica tradici\u00f3n de remedios caseros y plantas medicinales de Am\u00e9rica Latina.",
    domains: ['RemediosAbuela.com','BuscarRemedios.com','CocinaCurativa.com','PlantasMedicinales.com','RemediosGratis.com']
  },
  {
    name: 'Fashion (ES)', slug: 'fashion-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128087;',
    description: "Dominios de moda y belleza en espa\u00f1ol para la mujer latina. Esta colecci\u00f3n captura el estilo, la belleza y los outfits del mercado hispanohablante.",
    domains: ['FresaStyle.com','PonerseBella.com','HacerseBella.com','SerGuapa.com','OutfitNuevo.com']
  },
  {
    name: 'Clothing (ES)', slug: 'clothing-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#128090;',
    description: "Dominios de ropa y calzado en espa\u00f1ol para e-commerce. Esta colecci\u00f3n sirve al mercado de moda r\u00e1pida y tiendas en l\u00ednea en Am\u00e9rica Latina.",
    domains: ['ZapatosRapidos.com','TiendaZapatos.com','RopaFacil.com','ModaGratis.com','VestidosGratis.com']
  },
  {
    name: 'Single Words (ES)', slug: 'single-words-es', market: 'ES', region: 'Spanish-Speaking Americas',
    lifecycle: 'Early', tam: 'Massive', monetization: 'Broad', icon: '&#9997;',
    description: "Dominios de palabras \u00fanicas en espa\u00f1ol con alto valor ling\u00fc\u00edstico y emocional. Esta colecci\u00f3n posee verbos reflexivos y sustantivos poderosos que resuenan con audiencias hispanas.",
    domains: ['Creerse.com','Inspirarme.com','Conseguirlo.com','Mejorarme.com','Explicarme.com','Perdonarme.com','Abrazarme.com','Porfavorcito.com','Fundadora.com','Programadora.com']
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function domainSlug(domain) {
  return domain.replace('.com', '').toLowerCase();
}

function marketLabel(market) {
  if (market === 'EN') return 'English';
  if (market === 'FR') return 'French';
  if (market === 'ES') return 'Spanish';
  return market;
}

function langCode(market) {
  if (market === 'EN') return 'en';
  if (market === 'FR') return 'fr';
  if (market === 'ES') return 'es';
  return 'en';
}

function marketFlag(market) {
  if (market === 'EN') return '&#127482;&#127480;';
  if (market === 'FR') return '&#127467;&#127479;';
  if (market === 'ES') return '&#127474;&#127485;';
  return '';
}

function estimatePrice(domain) {
  const name = domain.replace('.com', '');
  const len = name.length;
  if (len <= 5) return { value: 150000, rent: 350 };
  if (len <= 8) return { value: 80000, rent: 200 };
  if (len <= 12) return { value: 40000, rent: 100 };
  if (len <= 16) return { value: 20000, rent: 50 };
  return { value: 10000, rent: 25 };
}

function savings(value, rent) {
  return (((value - rent * 12) / value) * 100).toFixed(1);
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// Find which sleeve a domain belongs to
function findSleeveForDomain(domainName) {
  for (const s of sleeves) {
    if (s.domains.includes(domainName)) return s;
  }
  return null;
}

// ============================================================
// SLEEVE PAGE TEMPLATE
// ============================================================
function generateSleevePage(sleeve) {
  const domainCount = sleeve.domains.length;
  const lang = langCode(sleeve.market);
  const mLabel = marketLabel(sleeve.market);
  const flag = marketFlag(sleeve.market);
  const tamClass = sleeve.tam.toLowerCase();

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(sleeve.name)} Portfolio Sleeve | ${domainCount} Premium Domains | PILLAR</title>
  <meta name="description" content="Explore the ${escHtml(sleeve.name)} portfolio sleeve - ${domainCount} curated premium domains for the ${escHtml(sleeve.region)} market. ${sleeve.tam} TAM, ${sleeve.monetization} monetization.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>P</text></svg>">
  <link rel="canonical" href="https://pillarme.com/portfolio/sleeves/${sleeve.slug}">
  <meta property="og:title" content="${escHtml(sleeve.name)} Portfolio Sleeve | PILLAR">
  <meta property="og:description" content="${domainCount} curated premium domains for the ${escHtml(sleeve.region)} market.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://pillarme.com/portfolio/sleeves/${sleeve.slug}">
  <meta property="og:site_name" content="PILLAR Corporation">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escHtml(sleeve.name)} Portfolio Sleeve | PILLAR">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#0A1628">
  <style>
    :root {
      --corporate-navy: #0A1628;
      --corporate-navy-light: #162544;
      --corporate-gold: #B8860B;
      --corporate-gold-light: #D4A853;
      --white: #FFFFFF;
      --off-white: #FAFBFC;
      --gray-50: #F9FAFB;
      --gray-100: #F3F4F6;
      --gray-200: #E5E7EB;
      --gray-300: #D1D5DB;
      --gray-500: #6B7280;
      --gray-600: #4B5563;
      --gray-900: #111827;
      --success: #059669;
      --nav-height: 72px;
      --font-display: 'Playfair Display', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-sans); background: var(--white); color: var(--gray-900); line-height: 1.6; -webkit-font-smoothing: antialiased; padding-top: var(--nav-height); }

    #site-header { position: fixed; top: 0; left: 0; width: 100%; height: 72px; background-color: #FFFFFF; border-bottom: 1px solid #E5E7EB; z-index: 9999; }
    #header-inner { max-width: 1600px; margin: 0 auto; height: 72px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
    #site-logo { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 600; color: #0A1628; text-decoration: none; letter-spacing: 0.2em; }
    #main-menu { display: flex; align-items: center; gap: 40px; }
    #main-menu a { font-family: 'Inter', -apple-system, sans-serif; font-size: 14px; font-weight: 500; color: #4B5563; text-decoration: none; }
    #main-menu a:hover { color: #0A1628; }
    #main-menu a.active { color: #0A1628; font-weight: 600; }
    #contact-btn { background-color: #0A1628 !important; color: #FFFFFF !important; padding: 10px 24px; border-radius: 4px; }
    #mobile-menu-btn { display: none; background: none; border: none; font-size: 24px; color: #0A1628; cursor: pointer; padding: 8px; }

    .breadcrumb { max-width: 1400px; margin: 0 auto; padding: 1.25rem 3rem; font-size: 0.875rem; color: var(--gray-500); }
    .breadcrumb a { color: var(--corporate-gold); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }

    .page-hero { background: linear-gradient(135deg, var(--corporate-navy) 0%, var(--corporate-navy-light) 100%); color: var(--white); padding: 5rem 3rem; }
    .page-hero-container { max-width: 1000px; margin: 0 auto; }
    .market-badge { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--white); background: rgba(255,255,255,0.15); padding: 0.375rem 0.75rem; border-radius: 4px; margin-bottom: 1.5rem; }
    .page-hero h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 400; line-height: 1.2; margin-bottom: 1.5rem; }
    .lead { font-size: 1.125rem; color: rgba(255,255,255,0.8); line-height: 1.7; max-width: 800px; margin-bottom: 2rem; }
    .meta-tags { display: flex; gap: 1rem; flex-wrap: wrap; }
    .meta-tag { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; font-weight: 600; padding: 0.5rem 1rem; border-radius: 6px; }
    .meta-tag.lifecycle { background: rgba(184,134,11,0.2); color: var(--corporate-gold-light); }
    .meta-tag.lifecycle-growth { background: rgba(5,150,105,0.25); color: #6EE7B7; }
    .live-dot { display: inline-block; width: 8px; height: 8px; background: #10B981; border-radius: 50%; animation: pulse-live 2s infinite; }
    @keyframes pulse-live { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(16,185,129,0); } }
    .meta-tag.tam-massive { background: rgba(5,150,105,0.2); color: #6EE7B7; }
    .meta-tag.tam-large { background: rgba(59,130,246,0.2); color: #93C5FD; }
    .meta-tag.tam-emerging { background: rgba(245,158,11,0.2); color: #FCD34D; }
    .meta-tag.monetization { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); }

    .section { padding: 5rem 3rem; }
    .section-container { max-width: 1400px; margin: 0 auto; }
    .section-header { text-align: center; max-width: 700px; margin: 0 auto 3rem; }
    .section-eyebrow { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: var(--corporate-gold); margin-bottom: 0.75rem; }
    .section-title { font-family: var(--font-display); font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 400; color: var(--corporate-navy); margin-bottom: 0.75rem; }
    .section-description { font-size: 1rem; color: var(--gray-600); line-height: 1.7; }

    .domains-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
    .domain-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 10px; padding: 1.5rem; text-decoration: none; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: space-between; }
    .domain-card:hover { border-color: var(--corporate-gold); box-shadow: 0 8px 24px rgba(10,22,40,0.08); transform: translateY(-2px); }
    .domain-card h4 { font-size: 1rem; font-weight: 600; color: var(--corporate-navy); margin-bottom: 0.5rem; word-break: break-all; }
    .domain-card .view-link { font-size: 0.8125rem; color: var(--corporate-gold); font-weight: 600; margin-top: 0.75rem; }
    .domain-card:hover .view-link { text-decoration: underline; }

    .back-section { padding: 4rem 3rem; background: var(--off-white); text-align: center; }
    .back-section p { font-size: 1rem; color: var(--gray-600); margin-bottom: 1rem; }
    .back-link { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600; color: var(--corporate-gold); text-decoration: none; }
    .back-link:hover { text-decoration: underline; }

    .cta-section { background: linear-gradient(135deg, var(--corporate-navy) 0%, var(--corporate-navy-light) 100%); padding: 5rem 3rem; text-align: center; }
    .cta-container { max-width: 700px; margin: 0 auto; }
    .cta-section .section-title { color: var(--white); margin-bottom: 1.5rem; }
    .cta-section .section-description { color: rgba(255,255,255,0.8); margin-bottom: 2.5rem; }
    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; font-size: 1rem; font-weight: 600; text-decoration: none; border-radius: 6px; transition: all 0.2s; }
    .btn-primary { background: var(--corporate-gold); color: var(--white); }
    .btn-primary:hover { background: var(--corporate-gold-light); }
    .btn-outline { background: transparent; color: var(--white); border: 2px solid rgba(255,255,255,0.3); }
    .btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.1); }

    footer { background: var(--corporate-navy); color: var(--white); padding: 5rem 3rem 2rem; }
    .footer-container { max-width: 1400px; margin: 0 auto; }
    .footer-top { display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .footer-brand { max-width: 280px; }
    .footer-logo { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.2em; margin-bottom: 1rem; }
    .footer-tagline { font-size: 0.875rem; color: rgba(255,255,255,0.6); line-height: 1.6; }
    .footer-nav h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem; }
    .footer-nav ul { list-style: none; }
    .footer-nav li { margin-bottom: 0.75rem; }
    .footer-nav a { font-size: 0.875rem; color: rgba(255,255,255,0.6); text-decoration: none; }
    .footer-nav a:hover { color: var(--white); }
    .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; flex-wrap: wrap; gap: 1rem; }
    .footer-legal { display: flex; gap: 2rem; }
    .footer-legal a { font-size: 0.8125rem; color: rgba(255,255,255,0.5); text-decoration: none; }
    .footer-copyright { font-size: 0.8125rem; color: rgba(255,255,255,0.5); }

    @media (max-width: 1200px) { .domains-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 1024px) { .domains-grid { grid-template-columns: repeat(2, 1fr); } .footer-top { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) {
      :root { --nav-height: 64px; }
      #header-inner { padding: 0 1.5rem; height: 64px; }
      #site-header { height: 64px; }
      #main-menu { display: none; }
      #main-menu.active { display: flex; flex-direction: column; position: fixed; top: 64px; left: 0; right: 0; background: #FFFFFF; padding: 1.5rem; border-bottom: 1px solid #E5E7EB; z-index: 9998; }
      #main-menu.active a { padding: 1rem; border-bottom: 1px solid #F3F4F6; }
      #mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
      .page-hero { padding: 3rem 1.5rem; }
      .section { padding: 3rem 1.5rem; }
      .breadcrumb { padding: 1rem 1.5rem; }
      .domains-grid { grid-template-columns: 1fr; }
      .meta-tags { flex-direction: column; align-items: flex-start; }
      .cta-actions { flex-direction: column; }
      .btn { width: 100%; justify-content: center; }
      footer { padding: 3rem 1.5rem 2rem; }
      .footer-top { grid-template-columns: 1fr; text-align: center; }
      .footer-brand { max-width: none; }
      .footer-bottom { flex-direction: column; text-align: center; }
      .footer-legal { justify-content: center; flex-wrap: wrap; }
    }
  </style>
</head>
<body>
  <header id="site-header">
    <div id="header-inner">
      <a href="/" id="site-logo">PILLAR</a>
      <nav id="main-menu">
        <a href="/about">About</a>
        <a href="/solutions">Solutions</a>
        <a href="/portfolio" class="active">Portfolio</a>
        <a href="/insights">Insights</a>
        <a href="/get-started" id="contact-btn">Contact</a>
      </nav>
      <button id="mobile-menu-btn" aria-label="Toggle menu">&#9776;</button>
    </div>
  </header>

  <div class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a> &rsaquo;
    <a href="/portfolio">Portfolio</a> &rsaquo;
    <a href="/portfolio/sleeves">Portfolio Sleeves</a> &rsaquo;
    <strong>${escHtml(sleeve.name)}</strong>
  </div>

  <section class="page-hero">
    <div class="page-hero-container">
      <div class="market-badge">${flag} ${mLabel} &bull; ${escHtml(sleeve.region)}</div>
      <h1>${sleeve.icon} ${escHtml(sleeve.name)}</h1>
      <p class="lead">${sleeve.description}</p>
      <div class="meta-tags">
        <span class="meta-tag ${sleeve.lifecycle === 'Growth' ? 'lifecycle-growth' : 'lifecycle'}">${sleeve.lifecycle === 'Growth' ? '<span class="live-dot"></span> ' : ''}Life Cycle: ${sleeve.lifecycle}</span>
        <span class="meta-tag tam-${tamClass}">TAM Signal: ${sleeve.tam}</span>
        <span class="meta-tag monetization">Monetization: ${sleeve.monetization}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-container">
      <div class="section-header">
        <p class="section-eyebrow">Domain Collection</p>
        <h2 class="section-title">${domainCount} Premium Domains</h2>
        <p class="section-description">Each domain in this sleeve has been selected for its brandability, search relevance, and market potential.</p>
      </div>
      <div class="domains-grid">
${sleeve.domains.map(d => {
  const ds = domainSlug(d);
  return `        <a href="/domains/${ds}" class="domain-card">
          <h4>${escHtml(d)}</h4>
          <span class="view-link">View Details &rarr;</span>
        </a>`;
}).join('\n')}
      </div>
    </div>
  </section>

  <section class="back-section">
    <p>Part of PILLAR Portfolio Sleeves</p>
    <a href="/portfolio/sleeves" class="back-link">&larr; View All Portfolio Sleeves</a>
  </section>

  <section class="cta-section">
    <div class="cta-container">
      <p class="section-eyebrow" style="color: var(--corporate-gold-light);">Interested in this sleeve?</p>
      <h2 class="section-title">Explore ${escHtml(sleeve.name)} Domains</h2>
      <p class="section-description">Browse the full collection or contact our team to discuss acquisition and leasing options for this portfolio sleeve.</p>
      <div class="cta-actions">
        <a href="/domains" class="btn btn-primary">Browse Domains</a>
        <a href="/get-started" class="btn btn-outline">Contact Us</a>
      </div>
    </div>
  </section>

  <footer role="contentinfo">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">PILLAR</div>
          <p class="footer-tagline">A global digital infrastructure and media corporation building the foundation of tomorrow's digital economy.</p>
          <div style="margin-top: 1.5rem;"><span style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em;">Global Presence</span></div>
          <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: rgba(255,255,255,0.6);">95 Countries &bull; 7,000+ Digital Properties &bull; $140M Portfolio</div>
        </div>
        <nav class="footer-nav"><h4>Company</h4><ul><li><a href="/about">About PILLAR</a></li><li><a href="/solutions">Solutions</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/portfolio/sleeves">Portfolio Sleeves</a></li><li><a href="/insights">Insights</a></li><li><a href="/get-started">Contact</a></li></ul></nav>
        <nav class="footer-nav"><h4>Services</h4><ul><li><a href="/domains">Premium Domains</a></li><li><a href="/ai-services">AI Platform</a></li><li><a href="/how-it-works">Enterprise Solutions</a></li><li><a href="/builder-demo">Platform Demo</a></li><li><a href="/domain-roi-calculator">ROI Calculator</a></li></ul></nav>
        <nav class="footer-nav"><h4>Support</h4><ul><li><a href="/faq">FAQ</a></li><li><a href="/support">Help Center</a></li><li><a href="/support">Documentation</a></li><li><a href="/support">System Status</a></li></ul></nav>
        <nav class="footer-nav"><h4>Connect</h4><ul><li><a href="https://www.webuildpillars.com" target="_blank" rel="noopener">We Build Pillars</a></li><li><a href="/get-started">Partner With Us</a></li><li><a href="/get-started">Enterprise Inquiries</a></li><li><a href="/get-started">Media Inquiries</a></li></ul></nav>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal"><a href="/faq">Privacy Policy</a><a href="/faq">Terms of Service</a><a href="/faq">Cookie Policy</a><a href="/support">Accessibility</a><a href="/faq">Legal</a></div>
        <p class="footer-copyright">&copy; 2025 PILLAR Corporation. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainMenu = document.getElementById('main-menu');
    if (mobileMenuBtn && mainMenu) {
      mobileMenuBtn.addEventListener('click', () => { mainMenu.classList.toggle('active'); mobileMenuBtn.setAttribute('aria-expanded', mainMenu.classList.contains('active')); });
      document.querySelectorAll('#main-menu a').forEach(link => { link.addEventListener('click', () => { mainMenu.classList.remove('active'); mobileMenuBtn.setAttribute('aria-expanded', 'false'); }); });
    }
  </script>
</body>
</html>`;
}

// ============================================================
// DOMAIN PAGE TEMPLATE
// ============================================================
function generateDomainPage(domain, sleeve) {
  const ds = domainSlug(domain);
  const pricing = estimatePrice(domain);
  const save = savings(pricing.value, pricing.rent);
  const lang = langCode(sleeve.market);
  const mLabel = marketLabel(sleeve.market);

  // Pick 2 related domains from same sleeve (not this one)
  const related = sleeve.domains.filter(d => d !== domain).slice(0, 2);

  // Generate use cases based on sleeve
  const useCaseMap = {
    'travel-experience': ['Travel booking platform','Hotel aggregator','Tour operator site','Destination guide','Event travel service','Group travel organizer'],
    'womens-health': ['Health information portal','Telemedicine platform','Wellness product store','Health community forum','Medical content site','Symptom tracker app'],
    'womens-sports': ['Sports training platform','Fitness community','Athletic wear store','Training program site','Sports news portal','Coaching service'],
    'womens-finance': ['Investment platform','Budgeting app','Financial education site','Banking comparison','Savings tracker','Financial advisor directory'],
    'womens-fashion': ['Fashion e-commerce','Style guide platform','Beauty product store','Fashion blog network','Trend forecasting','Personal styling service'],
    'womens-luxury': ['Luxury marketplace','Premium lifestyle blog','High-end shopping portal','Luxury brand directory','VIP concierge service','Wealth lifestyle content'],
    'mens-health': ['Health information portal','Telemedicine for men','Fitness supplement store','Medical advice platform','Recovery guide site','Health tracking app'],
    'new-parents': ['Parenting advice portal','Baby product store','Family activity finder','Child nutrition guide','Birth preparation platform','Parenting community'],
    'home-cooking': ['Recipe sharing platform','Cooking class marketplace','Meal planning app','Ingredient delivery service','Kitchen equipment store','Food content network'],
    'luxury-dining': ['Fine dining reservations','Gourmet food delivery','Chef booking platform','Premium ingredient store','Food experience marketplace','Culinary travel guide'],
    'casual-dining': ['Restaurant finder app','Food delivery platform','Dining deals aggregator','Restaurant review site','Menu comparison service','Local food guide'],
    'dating-marriage': ['Dating platform','Wedding planning site','Relationship coaching','Matchmaking service','Bridal marketplace','Couples activity finder'],
    'ya-literature': ['Book review platform','Reading community','Book recommendation engine','Author discovery site','Book-to-screen news','Literary discussion forum'],
    'nft': ['NFT marketplace','Digital art gallery','NFT portfolio tracker','Creator platform','NFT community hub','Digital collectibles store'],
    'entertainment': ['Celebrity news portal','Entertainment magazine','Fan community platform','Event ticket marketplace','Streaming guide','Celebrity brand partnerships'],
    'website-creation': ['Website builder platform','Blog hosting service','SEO tools suite','Content creation course','Digital marketing guide','Creator economy platform'],
  };

  const defaultUseCases = ['Content platform','E-commerce store','Community forum','Educational resource','Service marketplace','Brand website'];
  const useCases = useCaseMap[sleeve.slug] || defaultUseCases;

  // Generate FAQ answers
  const faq1Answer = `${domain} rents for $${pricing.rent} per month. This premium domain is valued at $${pricing.value.toLocaleString()}, meaning you save ${save}% compared to purchasing outright. The rental includes full DNS control, email forwarding, and immediate activation.`;
  const faq2Answer = `${domain} is part of the ${sleeve.name} portfolio sleeve, making it ideal for businesses in the ${sleeve.region} market. It works perfectly for ${useCases.slice(0, 3).join(', ').toLowerCase()}, and similar ventures.`;
  const faq3Answer = `Yes, you can cancel your ${domain} rental at any time with no long-term commitment. We also offer lease-to-own options if you decide to acquire the domain permanently.`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(domain)} Domain For Rent | Premium ${escHtml(sleeve.name)} Domain | PILLAR</title>
  <meta name="description" content="Rent ${escHtml(domain)} for just $${pricing.rent}/month. Premium domain perfect for ${escHtml(sleeve.name.toLowerCase())} businesses. Save ${save}% vs buying. Instant activation, cancel anytime.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>P</text></svg>">
  <link rel="canonical" href="https://pillarme.com/domains/${ds}">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#0A1628">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <meta property="og:title" content="${escHtml(domain)} - Premium Domain For Rent | PILLAR">
  <meta property="og:description" content="Rent this $${pricing.value.toLocaleString()} premium domain for just $${pricing.rent}/month. Part of the ${escHtml(sleeve.name)} portfolio sleeve.">
  <meta property="og:type" content="product">
  <meta property="og:url" content="https://pillarme.com/domains/${ds}">
  <meta property="og:site_name" content="PILLAR Corporation">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escHtml(domain)} - Premium Domain For Rent | $${pricing.rent}/mo">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${escHtml(domain)} Domain Rental",
    "description": "Premium domain in the ${escHtml(sleeve.name)} portfolio sleeve. Ideal for ${escHtml(sleeve.region)} market businesses.",
    "brand": {"@type": "Brand", "name": "PILLAR"},
    "offers": {
      "@type": "Offer",
      "url": "https://pillarme.com/domains/${ds}",
      "priceCurrency": "USD",
      "price": "${pricing.rent}",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {"@type": "Organization", "name": "PILLAR Corporation"}
    }
  }
  </script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "What is the monthly rental cost for ${escHtml(domain)}?", "acceptedAnswer": {"@type": "Answer", "text": "${escHtml(faq1Answer)}"}},
      {"@type": "Question", "name": "What industries is ${escHtml(domain)} best suited for?", "acceptedAnswer": {"@type": "Answer", "text": "${escHtml(faq2Answer)}"}},
      {"@type": "Question", "name": "Can I cancel my ${escHtml(domain)} rental?", "acceptedAnswer": {"@type": "Answer", "text": "${escHtml(faq3Answer)}"}}
    ]
  }
  </script>

  <style>
    :root {
      --corporate-navy: #0A1628; --corporate-navy-light: #162544;
      --corporate-gold: #B8860B; --corporate-gold-light: #D4A853;
      --white: #FFFFFF; --off-white: #FAFBFC;
      --gray-100: #F3F4F6; --gray-200: #E5E7EB; --gray-500: #6B7280; --gray-600: #4B5563; --gray-900: #111827;
      --success: #059669; --nav-height: 72px;
      --font-display: 'Playfair Display', Georgia, serif;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-sans); background: var(--white); color: var(--gray-900); line-height: 1.6; -webkit-font-smoothing: antialiased; padding-top: var(--nav-height); }

    #site-header { position: fixed; top: 0; left: 0; width: 100%; height: 72px; background-color: #FFFFFF; border-bottom: 1px solid #E5E7EB; z-index: 9999; }
    #header-inner { max-width: 1600px; margin: 0 auto; height: 72px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
    #site-logo { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--corporate-navy); text-decoration: none; letter-spacing: 0.2em; }
    #main-menu { display: flex; align-items: center; gap: 40px; }
    #main-menu a { font-size: 14px; font-weight: 500; color: var(--gray-600); text-decoration: none; }
    #main-menu a:hover { color: var(--corporate-navy); }
    #main-menu a.active { color: var(--corporate-navy); font-weight: 600; }
    #contact-btn { background-color: var(--corporate-navy) !important; color: var(--white) !important; padding: 10px 24px; border-radius: 4px; }
    #mobile-menu-btn { display: none; background: none; border: none; font-size: 24px; color: var(--corporate-navy); cursor: pointer; padding: 8px; }

    .breadcrumb { max-width: 1400px; margin: 0 auto; padding: 1.25rem 3rem; font-size: 0.875rem; color: var(--gray-500); }
    .breadcrumb a { color: var(--corporate-gold); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }

    .domain-hero { background: linear-gradient(135deg, #0A1628 0%, #162544 50%, #1a3a5c 100%); padding: 4rem 2rem 5rem; position: relative; overflow: hidden; }
    .domain-hero::before { content: ''; position: absolute; top: 20%; left: 30%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(184,134,11,0.15) 0%, transparent 60%); pointer-events: none; }
    .domain-hero-content { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
    .domain-hero-text { color: #fff; }
    .domain-hero-text h1 { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; letter-spacing: -1px; margin-bottom: 1rem; line-height: 1.1; background: linear-gradient(135deg, #fff 0%, var(--corporate-gold-light) 50%, var(--corporate-gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .domain-hero-text .tagline { font-size: 1.25rem; color: rgba(255,255,255,0.8); margin-bottom: 2rem; font-weight: 500; }
    .value-props { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; }
    .value-prop { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.875rem; font-weight: 600; color: #fff; border: 1px solid rgba(255,255,255,0.2); }
    .value-prop.gold { background: linear-gradient(135deg, rgba(184,134,11,0.3) 0%, rgba(184,134,11,0.1) 100%); border-color: var(--corporate-gold); }

    .pricing-card { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); border: 3px solid var(--corporate-gold); border-radius: 24px; padding: 2.5rem; text-align: center; position: relative; backdrop-filter: blur(10px); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(184,134,11,0.15); }
    .pricing-card::before { content: 'PREMIUM'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--corporate-gold); color: #fff; padding: 0.375rem 1.5rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; }
    .pricing-card .domain-display { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 1rem 0; word-break: break-all; }
    .pricing-card .valuation { font-size: 1rem; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; }
    .pricing-card .valuation strong { color: var(--corporate-gold-light); font-size: 1.5rem; }
    .pricing-card .price { font-size: 3.5rem; font-weight: 900; color: #fff; line-height: 1; }
    .pricing-card .price span { font-size: 1.25rem; color: rgba(255,255,255,0.6); font-weight: 500; }
    .pricing-card .savings-badge { display: inline-block; background: var(--success); color: #fff; padding: 0.375rem 1rem; border-radius: 50px; font-size: 0.875rem; font-weight: 700; margin: 1rem 0 1.5rem; }
    .rent-btn { display: block; width: 100%; background: var(--corporate-gold); color: #fff; padding: 1.125rem 2rem; border-radius: 12px; font-size: 1.125rem; font-weight: 800; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; }
    .rent-btn:hover { background: var(--corporate-gold-light); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(184,134,11,0.3); }
    .pricing-card .guarantee { margin-top: 1rem; font-size: 0.875rem; color: rgba(255,255,255,0.6); }

    .content-section { max-width: 900px; margin: 0 auto; padding: 4rem 2rem; }
    .content-section h2 { font-family: var(--font-display); font-size: 2rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--corporate-navy); }
    .content-section h3 { font-size: 1.375rem; font-weight: 700; margin: 2rem 0 1rem; color: var(--corporate-navy); }
    .content-section p { font-size: 1.0625rem; line-height: 1.8; margin-bottom: 1.25rem; color: var(--gray-600); }

    .use-cases { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin: 2rem 0; }
    .use-case { display: flex; align-items: center; gap: 0.75rem; background: var(--off-white); padding: 1rem 1.25rem; border-radius: 8px; font-weight: 500; font-size: 0.95rem; }
    .use-case::before { content: '\\2713'; color: var(--success); font-weight: 700; }

    .faq-section { padding: 4rem 2rem; background: var(--off-white); }
    .faq-container { max-width: 800px; margin: 0 auto; }
    .faq-section h2 { font-family: var(--font-display); text-align: center; margin-bottom: 2.5rem; font-size: 2rem; color: var(--corporate-navy); }
    .faq-item { border: 2px solid var(--gray-200); border-radius: 12px; margin-bottom: 1rem; overflow: hidden; transition: all 0.3s; background: var(--white); }
    .faq-item:hover { border-color: var(--corporate-gold); }
    .faq-item.open { border-color: var(--corporate-gold); }
    .faq-question { padding: 1.25rem 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.0625rem; }
    .faq-question:hover { color: var(--corporate-gold); }
    .faq-icon { font-size: 1.5rem; transition: transform 0.3s; color: var(--corporate-gold); }
    .faq-item.open .faq-icon { transform: rotate(45deg); }
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
    .faq-answer-content { padding: 0 1.5rem 1.5rem; color: var(--gray-600); line-height: 1.8; }

    .cta-section { background: linear-gradient(135deg, var(--corporate-navy) 0%, var(--corporate-navy-light) 100%); padding: 5rem 2rem; text-align: center; color: #fff; }
    .cta-section h2 { font-family: var(--font-display); font-size: 2.25rem; font-weight: 600; margin-bottom: 1rem; }
    .cta-section p { font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-btn { display: inline-block; background: var(--corporate-gold); color: #fff; padding: 1.125rem 2.5rem; border-radius: 10px; font-size: 1.125rem; font-weight: 800; text-decoration: none; transition: all 0.3s; }
    .cta-btn:hover { background: var(--corporate-gold-light); transform: translateY(-2px); }

    .related-section { padding: 4rem 2rem; background: var(--off-white); }
    .related-container { max-width: 1200px; margin: 0 auto; }
    .related-section h2 { font-family: var(--font-display); text-align: center; margin-bottom: 2.5rem; font-size: 2rem; color: var(--corporate-navy); }
    .related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .related-card { background: var(--white); border: 2px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s; text-decoration: none; color: inherit; }
    .related-card:hover { border-color: var(--corporate-gold); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(184,134,11,0.1); }
    .related-card .domain-name { font-weight: 700; font-size: 1.0625rem; color: var(--corporate-navy); }
    .related-card .domain-price { color: var(--corporate-gold); font-weight: 700; }

    footer { background: var(--corporate-navy); color: var(--white); padding: 5rem 3rem 2rem; }
    .footer-container { max-width: 1400px; margin: 0 auto; }
    .footer-top { display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .footer-brand { max-width: 280px; }
    .footer-logo { font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 0.2em; margin-bottom: 1rem; }
    .footer-tagline { font-size: 0.875rem; color: rgba(255,255,255,0.6); line-height: 1.6; }
    .footer-nav h4 { font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem; }
    .footer-nav ul { list-style: none; }
    .footer-nav li { margin-bottom: 0.75rem; }
    .footer-nav a { font-size: 0.875rem; color: rgba(255,255,255,0.6); text-decoration: none; }
    .footer-nav a:hover { color: var(--white); }
    .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; flex-wrap: wrap; gap: 1rem; }
    .footer-legal { display: flex; gap: 2rem; }
    .footer-legal a { font-size: 0.8125rem; color: rgba(255,255,255,0.5); text-decoration: none; }
    .footer-copyright { font-size: 0.8125rem; color: rgba(255,255,255,0.5); }

    @media (max-width: 968px) { .domain-hero-content { grid-template-columns: 1fr; text-align: center; } .value-props { justify-content: center; } .pricing-card { max-width: 400px; margin: 0 auto; } .use-cases { grid-template-columns: 1fr 1fr; } .related-grid { grid-template-columns: 1fr; } }
    @media (max-width: 768px) {
      :root { --nav-height: 64px; }
      #header-inner { padding: 0 1.5rem; height: 64px; }
      #site-header { height: 64px; }
      #main-menu { display: none; }
      #main-menu.active { display: flex; flex-direction: column; position: fixed; top: 64px; left: 0; right: 0; background: #FFFFFF; padding: 1.5rem; border-bottom: 1px solid #E5E7EB; z-index: 9998; }
      #main-menu.active a { padding: 1rem; border-bottom: 1px solid #F3F4F6; }
      #mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
      .domain-hero { padding: 2rem 1.5rem 3rem; }
      .domain-hero-text h1 { font-size: 2.5rem; }
      .pricing-card .price { font-size: 2.75rem; }
      .content-section { padding: 3rem 1.5rem; }
      .use-cases { grid-template-columns: 1fr; }
      .faq-section { padding: 3rem 1.5rem; }
      .cta-section { padding: 3rem 1.5rem; }
      .cta-section h2 { font-size: 1.75rem; }
      footer { padding: 3rem 1.5rem 2rem; }
      .footer-top { grid-template-columns: 1fr; text-align: center; }
      .footer-brand { max-width: none; }
      .footer-bottom { flex-direction: column; text-align: center; }
      .footer-legal { justify-content: center; flex-wrap: wrap; }
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
  <header id="site-header">
    <div id="header-inner">
      <a href="/" id="site-logo">PILLAR</a>
      <nav id="main-menu">
        <a href="/about">About</a>
        <a href="/solutions">Solutions</a>
        <a href="/portfolio" class="active">Portfolio</a>
        <a href="/insights">Insights</a>
        <a href="/get-started" id="contact-btn">Contact</a>
      </nav>
      <button id="mobile-menu-btn" aria-label="Toggle menu">&#9776;</button>
    </div>
  </header>

  <div class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a> &rsaquo;
    <a href="/domains">Domains</a> &rsaquo;
    <strong>${escHtml(domain)}</strong>
  </div>

  <header class="domain-hero">
    <div class="domain-hero-content">
      <div class="domain-hero-text">
        <h1>${escHtml(domain)}</h1>
        <p class="tagline">Premium ${escHtml(sleeve.name)} Domain for Rent</p>
        <div class="value-props">
          <span class="value-prop">${sleeve.icon} ${escHtml(sleeve.name)}</span>
          <span class="value-prop">${marketFlag(sleeve.market)} ${mLabel}</span>
          <span class="value-prop gold">&#128081; Premium</span>
        </div>
      </div>
      <div class="pricing-card">
        <div class="domain-display">${escHtml(domain)}</div>
        <div class="valuation">Domain Value: <strong>$${pricing.value.toLocaleString()}</strong></div>
        <div class="price">$${pricing.rent}<span>/month</span></div>
        <div class="savings-badge">Save ${save}% vs. Purchase</div>
        <a href="/get-started?domain=${encodeURIComponent(domain.toLowerCase())}" class="rent-btn">Rent This Domain</a>
        <p class="guarantee">Cancel anytime &bull; No long-term commitment</p>
      </div>
    </div>
  </header>

  <section class="content-section">
    <h2>Why ${escHtml(domain)} is a Premium Asset</h2>
    <p><strong>${escHtml(domain)} is a high-value domain in the ${escHtml(sleeve.name)} portfolio sleeve.</strong> This domain combines brandability, memorability, and market relevance to give your business an immediate competitive advantage in the ${escHtml(sleeve.region)} market.</p>
    <p>Whether you are launching a new venture or expanding an existing brand, ${escHtml(domain)} positions you for success in the ${escHtml(sleeve.name.toLowerCase())} space with a name that communicates authority and trust from the very first impression.</p>

    <h3>What You Could Build on ${escHtml(domain)}</h3>
    <div class="use-cases">
${useCases.map(uc => `      <div class="use-case">${escHtml(uc)}</div>`).join('\n')}
    </div>
  </section>

  <section class="faq-section" id="faq">
    <div class="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <div class="faq-question"><span>What is the monthly rental cost for ${escHtml(domain)}?</span><span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-content">${faq1Answer}</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>What industries is ${escHtml(domain)} best suited for?</span><span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-content">${faq2Answer}</div></div>
      </div>
      <div class="faq-item">
        <div class="faq-question"><span>Can I cancel my ${escHtml(domain)} rental?</span><span class="faq-icon">+</span></div>
        <div class="faq-answer"><div class="faq-answer-content">${faq3Answer}</div></div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>Ready to Claim ${escHtml(domain)}?</h2>
    <p>This premium domain is available now. Secure it before your competitor does.</p>
    <a href="/get-started?domain=${encodeURIComponent(domain.toLowerCase())}" class="cta-btn">Rent ${escHtml(domain)} Today</a>
  </section>

  <section class="related-section">
    <div class="related-container">
      <h2>Related Premium Domains</h2>
      <div class="related-grid">
${related.map(rd => {
  const rds = domainSlug(rd);
  const rp = estimatePrice(rd);
  return `        <a href="/domains/${rds}" class="related-card"><div><div class="domain-name">${escHtml(rd)}</div><div style="color:var(--gray-500);font-size:.875rem">${escHtml(sleeve.name)}</div></div><span class="domain-price">$${rp.rent}/mo</span></a>`;
}).join('\n')}
        <a href="/portfolio/sleeves/${sleeve.slug}" class="related-card"><div><div class="domain-name">${escHtml(sleeve.name)} Sleeve</div><div style="color:var(--gray-500);font-size:.875rem">View all domains in this sleeve</div></div><span class="domain-price">${sleeve.domains.length} domains</span></a>
      </div>
    </div>
  </section>

  <footer role="contentinfo">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">PILLAR</div>
          <p class="footer-tagline">A global digital infrastructure and media corporation building the foundation of tomorrow's digital economy.</p>
          <div style="margin-top: 1.5rem;"><span style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em;">Global Presence</span></div>
          <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: rgba(255,255,255,0.6);">95 Countries &bull; 7,000+ Digital Properties &bull; $140M Portfolio</div>
        </div>
        <nav class="footer-nav"><h4>Company</h4><ul><li><a href="/about">About PILLAR</a></li><li><a href="/solutions">Solutions</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/portfolio/sleeves">Portfolio Sleeves</a></li><li><a href="/insights">Insights</a></li><li><a href="/get-started">Contact</a></li></ul></nav>
        <nav class="footer-nav"><h4>Services</h4><ul><li><a href="/domains">Premium Domains</a></li><li><a href="/ai-services">AI Platform</a></li><li><a href="/how-it-works">Enterprise Solutions</a></li><li><a href="/builder-demo">Platform Demo</a></li><li><a href="/domain-roi-calculator">ROI Calculator</a></li></ul></nav>
        <nav class="footer-nav"><h4>Support</h4><ul><li><a href="/faq">FAQ</a></li><li><a href="/support">Help Center</a></li><li><a href="/support">Documentation</a></li><li><a href="/support">System Status</a></li></ul></nav>
        <nav class="footer-nav"><h4>Connect</h4><ul><li><a href="https://www.webuildpillars.com" target="_blank" rel="noopener">We Build Pillars</a></li><li><a href="/get-started">Partner With Us</a></li><li><a href="/get-started">Enterprise Inquiries</a></li><li><a href="/get-started">Media Inquiries</a></li></ul></nav>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal"><a href="/faq">Privacy Policy</a><a href="/faq">Terms of Service</a><a href="/faq">Cookie Policy</a><a href="/support">Accessibility</a><a href="/faq">Legal</a></div>
        <p class="footer-copyright">&copy; 2025 PILLAR Corporation. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainMenu = document.getElementById('main-menu');
    if (mobileMenuBtn && mainMenu) {
      mobileMenuBtn.addEventListener('click', () => { mainMenu.classList.toggle('active'); mobileMenuBtn.setAttribute('aria-expanded', mainMenu.classList.contains('active')); });
      document.querySelectorAll('#main-menu a').forEach(link => { link.addEventListener('click', () => { mainMenu.classList.remove('active'); mobileMenuBtn.setAttribute('aria-expanded', 'false'); }); });
    }
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) { i.classList.remove('open'); i.querySelector('.faq-answer').style.maxHeight = '0'; } });
        if (isOpen) { item.classList.remove('open'); answer.style.maxHeight = '0'; }
        else { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
      });
    });
  </script>
</body>
</html>`;
}

// ============================================================
// MAIN GENERATION
// ============================================================
const SLEEVES_DIR = path.join(__dirname, 'portfolio', 'sleeves');
const DOMAINS_DIR = path.join(__dirname, 'domains');

// Ensure directories exist
if (!fs.existsSync(SLEEVES_DIR)) fs.mkdirSync(SLEEVES_DIR, { recursive: true });
if (!fs.existsSync(DOMAINS_DIR)) fs.mkdirSync(DOMAINS_DIR, { recursive: true });

let sleeveCount = 0;
let domainCreated = 0;
let domainSkipped = 0;

console.log('=== PILLAR Sleeve & Domain Page Generator ===\n');

for (const sleeve of sleeves) {
  // Generate sleeve page
  const sleevePath = path.join(SLEEVES_DIR, `${sleeve.slug}.html`);
  const sleeveHtml = generateSleevePage(sleeve);
  fs.writeFileSync(sleevePath, sleeveHtml, 'utf8');
  sleeveCount++;
  console.log(`[SLEEVE ${sleeveCount}/${sleeves.length}] ${sleeve.name} -> ${sleeve.slug}.html (${sleeve.domains.length} domains)`);

  // Generate domain pages
  for (const domain of sleeve.domains) {
    const ds = domainSlug(domain);
    const domainPath = path.join(DOMAINS_DIR, `${ds}.html`);

    if (fs.existsSync(domainPath)) {
      domainSkipped++;
      continue;
    }

    const domainHtml = generateDomainPage(domain, sleeve);
    fs.writeFileSync(domainPath, domainHtml, 'utf8');
    domainCreated++;
  }

  console.log(`  -> Created ${sleeve.domains.filter(d => !fs.existsSync(path.join(DOMAINS_DIR, domainSlug(d) + '.html')) || true).length - domainSkipped >= 0 ? '' : ''}domains for this sleeve`);
}

// Final summary
const totalDomains = sleeves.reduce((sum, s) => sum + s.domains.length, 0);
console.log(`\n=== Generation Complete ===`);
console.log(`Sleeve pages created: ${sleeveCount}`);
console.log(`Domain pages created: ${domainCreated}`);
console.log(`Domain pages skipped (already existed): ${domainSkipped}`);
console.log(`Total domains in data: ${totalDomains}`);
console.log(`Files written to:`);
console.log(`  Sleeves: ${SLEEVES_DIR}/`);
console.log(`  Domains: ${DOMAINS_DIR}/`);
