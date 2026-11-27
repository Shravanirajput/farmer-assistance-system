// Crop health guide. General information only, based on ICAR institutes and
// Maharashtra agricultural universities. It does not replace diagnosis by an expert.
// Chemical names and doses are intentionally not given: farmers should confirm
// the disease and the treatment with their Krishi Sevak / KVK first.

export const diseaseCrops = [
  { id: 'soybean', name: { en: 'Soybean', mr: 'सोयाबीन' } },
  { id: 'cotton', name: { en: 'Cotton', mr: 'कापूस' } },
  { id: 'tur', name: { en: 'Pigeon Pea / Tur', mr: 'तूर' } },
  { id: 'jowar', name: { en: 'Sorghum / Jowar', mr: 'ज्वारी' } },
  { id: 'chickpea', name: { en: 'Chickpea / Gram', mr: 'हरभरा' } },
  { id: 'wheat', name: { en: 'Wheat', mr: 'गहू' } },
  { id: 'safflower', name: { en: 'Safflower', mr: 'करडई' } },
  { id: 'rice', name: { en: 'Rice / Paddy', mr: 'भात' } },
  { id: 'bajra', name: { en: 'Pearl Millet / Bajra', mr: 'बाजरी' } },
  { id: 'groundnut', name: { en: 'Groundnut', mr: 'भुईमूग' } },
  { id: 'onion', name: { en: 'Onion', mr: 'कांदा' } },
]

export const diseases = [
  {
    id: 'soybean-yellow-mosaic',
    cropId: 'soybean',
    name: { en: 'Yellow Mosaic Disease', mr: 'पिवळा मोझॅक' },
    cause: 'virus',
    symptoms: [
      { en: 'Yellow and green mosaic patches appear on the leaves.', mr: 'पानांवर पिवळे-हिरवे चट्टे (मोझॅक) दिसतात.' },
      { en: 'Badly affected plants stay small and set fewer pods.', mr: 'जास्त बाधित झाडे खुजी राहतात व शेंगा कमी लागतात.' },
    ],
    favorableConditions: [
      { en: 'Spread by whitefly; more whiteflies mean faster spread.', mr: 'पांढऱ्या माशीमुळे प्रसार; माशी जास्त तर प्रसार जलद.' },
      { en: 'Warm weather increases whitefly activity.', mr: 'उष्ण हवामानात पांढऱ्या माशीची हालचाल वाढते.' },
    ],
    prevention: [
      { en: 'Use healthy seed and inspect the crop regularly for early symptoms.', mr: 'निरोगी बियाणे वापरा व सुरुवातीची लक्षणे पाहण्यासाठी नियमित पाहणी करा.' },
      { en: 'Pull out badly affected plants and keep field bunds free of weeds.', mr: 'जास्त बाधित झाडे उपटून टाका व बांध तणमुक्त ठेवा.' },
    ],
    management: [
      { en: 'Monitor whitefly numbers with yellow sticky traps and seek local advice when symptoms appear.', mr: 'पिवळ्या चिकट सापळ्यांनी पांढऱ्या माशीवर लक्ष ठेवा व लक्षणे दिसताच स्थानिक सल्ला घ्या.' },
    ],
    sourceNote: { en: 'PDKV Akola Plant Disease Guide; ICAR-NCIPM soybean resources.', mr: 'PDKV अकोला रोग मार्गदर्शिका; ICAR-NCIPM सोयाबीन माहिती.' },
  },
  {
    id: 'soybean-charcoal-rot',
    cropId: 'soybean',
    name: { en: 'Charcoal Rot', mr: 'खोडकूज (चारकोल रॉट)' },
    cause: 'fungus',
    symptoms: [
      { en: 'Plants wilt and mature early, especially under moisture stress.', mr: 'विशेषतः पाण्याच्या ताणात झाडे सुकतात व लवकर पक्व होतात.' },
      { en: 'Lower stem and roots turn grey with tiny black specks, like charcoal dust.', mr: 'खोडाचा खालचा भाग व मुळे राखाडी होऊन त्यावर कोळशासारखे बारीक काळे ठिपके दिसतात.' },
    ],
    favorableConditions: [
      { en: 'Hot, dry weather and moisture stress.', mr: 'उष्ण, कोरडे हवामान व पाण्याचा ताण.' },
      { en: 'The fungus survives in soil and in crop residue.', mr: 'बुरशी जमिनीत व पिकाच्या अवशेषांत टिकून राहते.' },
    ],
    prevention: [
      { en: 'Keep soil moisture steady where possible and avoid growing soybean year after year.', mr: 'शक्य तिथे जमिनीतील ओलावा टिकवा व सलग सोयाबीन घेणे टाळा.' },
      { en: 'Use healthy seed of varieties recommended for your area.', mr: 'आपल्या भागासाठी शिफारस केलेल्या वाणांचे निरोगी बियाणे वापरा.' },
    ],
    management: [
      { en: 'Inspect wilted patches and take local advice before deciding on treatment.', mr: 'सुकलेल्या भागांची पाहणी करा व उपाय ठरवण्यापूर्वी स्थानिक सल्ला घ्या.' },
    ],
    sourceNote: { en: 'PDKV Akola Plant Disease Guide; ICAR-NCIPM soybean resources.', mr: 'PDKV अकोला रोग मार्गदर्शिका; ICAR-NCIPM सोयाबीन माहिती.' },
  },
  {
    id: 'soybean-rust',
    cropId: 'soybean',
    name: { en: 'Rust', mr: 'तांबेरा' },
    cause: 'fungus',
    symptoms: [
      { en: 'Small tan to reddish-brown spots with powdery pustules on the underside of leaves.', mr: 'पानांच्या खालच्या बाजूस भुरकट ते लालसर-तपकिरी ठिपके व भुकटीसारखे फोड.' },
      { en: 'Severe infection makes leaves yellow and drop early.', mr: 'तीव्र प्रादुर्भावात पाने पिवळी पडून लवकर गळतात.' },
    ],
    favorableConditions: [
      { en: 'Long leaf wetness and humid, cloudy weather.', mr: 'पाने दीर्घकाळ ओली राहणे व दमट, ढगाळ हवामान.' },
      { en: 'Spores travel by wind from infected fields.', mr: 'बाधित शेतातून बीजाणू वाऱ्याने पसरतात.' },
    ],
    prevention: [
      { en: 'Check lower leaves regularly and grow locally recommended varieties.', mr: 'खालची पाने नियमित तपासा व स्थानिक शिफारस केलेले वाण घ्या.' },
      { en: 'Remove volunteer soybean plants and old residue.', mr: 'आपोआप उगवलेली सोयाबीन झाडे व जुने अवशेष काढून टाका.' },
    ],
    management: [
      { en: 'Get suspected rust confirmed by an expert before choosing a spray.', mr: 'फवारणी ठरवण्यापूर्वी तांबेरा असल्याची तज्ज्ञांकडून खात्री करा.' },
    ],
    sourceNote: { en: 'PDKV Akola Plant Disease Guide; ICAR soybean crop protection resources.', mr: 'PDKV अकोला रोग मार्गदर्शिका; ICAR सोयाबीन पीक संरक्षण माहिती.' },
  },
  {
    id: 'cotton-bacterial-blight',
    cropId: 'cotton',
    name: { en: 'Bacterial Blight', mr: 'जिवाणूजन्य करपा' },
    cause: 'bacteria',
    symptoms: [
      { en: 'Water-soaked, angular spots on leaves.', mr: 'पानांवर पाणथळ, कोनाकृती ठिपके.' },
      { en: 'Dark lesions on stems, branches, bracts and bolls.', mr: 'खोड, फांद्या, पुष्पकोष व बोंडांवर काळे चट्टे.' },
    ],
    favorableConditions: [
      { en: 'Warm, humid weather with long leaf wetness.', mr: 'उष्ण, दमट हवामान व पाने दीर्घकाळ ओली राहणे.' },
      { en: 'Rain splash spreads it from plant to plant.', mr: 'पावसाच्या शिंतोड्यांनी झाडावरून झाडावर पसरतो.' },
    ],
    prevention: [
      { en: 'Use clean seed and clear crop residue after harvest.', mr: 'स्वच्छ बियाणे वापरा व काढणीनंतर अवशेष नष्ट करा.' },
      { en: 'Avoid walking through the field when plants are wet.', mr: 'झाडे ओली असताना शेतातून फिरणे टाळा.' },
    ],
    management: [
      { en: 'Inspect early and have a local expert confirm the symptoms.', mr: 'लवकर पाहणी करा व स्थानिक तज्ज्ञांकडून लक्षणांची खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-CICR Nagpur cotton disease guidance; ICAR-NCIPM.', mr: 'ICAR-CICR नागपूर कापूस रोग मार्गदर्शन; ICAR-NCIPM.' },
  },
  {
    id: 'cotton-grey-mildew',
    cropId: 'cotton',
    name: { en: 'Grey Mildew', mr: 'दहिया रोग' },
    cause: 'fungus',
    symptoms: [
      { en: 'Pale, angular spots on leaves with greyish-white powdery growth underneath.', mr: 'पानांवर फिकट कोनाकृती ठिपके व खालच्या बाजूस राखाडी-पांढरी भुकटी.' },
      { en: 'Leaves turn yellow and fall in severe cases.', mr: 'तीव्र प्रादुर्भावात पाने पिवळी पडून गळतात.' },
    ],
    favorableConditions: [
      { en: 'Humid weather and a dense crop canopy.', mr: 'दमट हवामान व दाट पीक.' },
      { en: 'Long periods of leaf wetness late in the season.', mr: 'हंगामाच्या उत्तरार्धात पाने दीर्घकाळ ओली राहणे.' },
    ],
    prevention: [
      { en: 'Use recommended varieties and spacing; avoid excess nitrogen.', mr: 'शिफारस केलेले वाण व अंतर वापरा; जास्त नत्र टाळा.' },
      { en: 'Monitor regularly and manage infected residue after harvest.', mr: 'नियमित पाहणी करा व काढणीनंतर बाधित अवशेषांचे व्यवस्थापन करा.' },
    ],
    management: [
      { en: 'Seek cotton extension advice when spots spread or leaf fall increases.', mr: 'ठिपके वाढल्यास किंवा पानगळ वाढल्यास कापूस विस्तार अधिकाऱ्यांचा सल्ला घ्या.' },
    ],
    sourceNote: { en: 'ICAR-CICR Illustrative Guide for Integrated Management of Cotton Pests and Diseases.', mr: 'ICAR-CICR कापूस कीड व रोग एकात्मिक व्यवस्थापन मार्गदर्शिका.' },
  },
  {
    id: 'cotton-alternaria-leaf-spot',
    cropId: 'cotton',
    name: { en: 'Alternaria Leaf Spot', mr: 'अल्टरनेरिया पानावरील ठिपके' },
    cause: 'fungus',
    symptoms: [
      { en: 'Brown spots with darker rings that grow larger over time.', mr: 'गडद वलयांचे तपकिरी ठिपके जे हळूहळू मोठे होतात.' },
      { en: 'Many spots lead to yellowing and early leaf fall.', mr: 'ठिपके वाढल्यास पाने पिवळी पडून लवकर गळतात.' },
    ],
    favorableConditions: [
      { en: 'Warm, humid weather with repeated leaf wetness.', mr: 'उष्ण, दमट हवामान व पाने वारंवार ओली होणे.' },
      { en: 'Infected seed or residue carries it to the next season.', mr: 'बाधित बियाणे किंवा अवशेषांमुळे पुढील हंगामात येतो.' },
    ],
    prevention: [
      { en: 'Use clean seed and manage infected residue.', mr: 'स्वच्छ बियाणे वापरा व बाधित अवशेषांचे व्यवस्थापन करा.' },
      { en: 'Watch the crop closely during humid spells.', mr: 'दमट हवामानात पिकावर बारकाईने लक्ष ठेवा.' },
    ],
    management: [
      { en: 'Confirm the disease with extension staff before choosing a treatment.', mr: 'उपाय ठरवण्यापूर्वी विस्तार कर्मचाऱ्यांकडून रोगाची खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-CICR Technical Bulletin No. 34; cotton disease monitoring reports.', mr: 'ICAR-CICR तांत्रिक पुस्तिका क्र. 34; कापूस रोग सर्वेक्षण अहवाल.' },
  },
  {
    id: 'tur-fusarium-wilt',
    cropId: 'tur',
    name: { en: 'Fusarium Wilt', mr: 'मर रोग' },
    cause: 'fungus',
    symptoms: [
      { en: 'Plants wilt, sometimes on one side first, then dry completely.', mr: 'झाडे मलूल होतात, कधी एका बाजूने सुरुवात, नंतर पूर्ण वाळतात.' },
      { en: 'Brown or black streaks inside the stem when the bark is peeled.', mr: 'साल काढल्यास खोडाच्या आत तपकिरी किंवा काळ्या रेषा दिसतात.' },
    ],
    favorableConditions: [
      { en: 'Soil-borne; persists in infested fields for years.', mr: 'जमिनीतून पसरणारा; बाधित शेतात अनेक वर्षे टिकतो.' },
      { en: 'Warm soil and plant stress make it worse.', mr: 'उष्ण जमीन व झाडावरील ताणामुळे वाढतो.' },
    ],
    prevention: [
      { en: 'Grow wilt-resistant varieties recommended for your area.', mr: 'आपल्या भागासाठी शिफारस केलेले मर-प्रतिकारक वाण घ्या.' },
      { en: 'Rotate crops and remove badly affected plants.', mr: 'पिकांची फेरपालट करा व जास्त बाधित झाडे काढून टाका.' },
    ],
    management: [
      { en: 'Mark affected patches and get local advice before choosing a control measure.', mr: 'बाधित भाग चिन्हांकित करा व उपाय निवडण्यापूर्वी स्थानिक सल्ला घ्या.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Pulses Research; PDKV Akola Plant Disease Guide.', mr: 'ICAR-भारतीय कडधान्य संशोधन संस्था; PDKV अकोला रोग मार्गदर्शिका.' },
  },
  {
    id: 'tur-sterility-mosaic',
    cropId: 'tur',
    name: { en: 'Sterility Mosaic Disease', mr: 'वांझ रोग' },
    cause: 'virus',
    symptoms: [
      { en: 'Light and dark green mosaic on small leaves.', mr: 'लहान पानांवर फिकट व गडद हिरवा मोझॅक.' },
      { en: 'Bushy plants with many branches but few or no flowers and pods.', mr: 'झाड झुडपासारखे, फांद्या भरपूर पण फुले व शेंगा फार कमी किंवा नाहीत.' },
    ],
    favorableConditions: [
      { en: 'Spread by a tiny eriophyid mite.', mr: 'अतिशय लहान कोळी (माइट) मुळे पसरतो.' },
      { en: 'Volunteer and ratoon tur plants keep the disease alive.', mr: 'आपोआप उगवलेली व खोडवा तूर रोग टिकवून ठेवते.' },
    ],
    prevention: [
      { en: 'Grow resistant varieties where available.', mr: 'उपलब्ध असल्यास प्रतिकारक वाण घ्या.' },
      { en: 'Uproot volunteer tur and check fields early for mosaic.', mr: 'आपोआप उगवलेली तूर उपटून टाका व मोझॅकसाठी लवकर पाहणी करा.' },
    ],
    management: [
      { en: 'Have a pulse expert confirm the disease before deciding on control.', mr: 'नियंत्रण ठरवण्यापूर्वी कडधान्य तज्ज्ञांकडून रोगाची खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-IIPR Field Guide: Pests and Diseases of Pigeonpea.', mr: 'ICAR-IIPR तूर कीड व रोग क्षेत्र मार्गदर्शिका.' },
  },
  {
    id: 'jowar-grain-mold',
    cropId: 'jowar',
    name: { en: 'Grain Mold', mr: 'दाण्यांवरील बुरशी' },
    cause: 'fungus',
    symptoms: [
      { en: 'Grains turn pink, grey or black with visible mold.', mr: 'दाणे गुलाबी, राखाडी किंवा काळे होऊन बुरशी दिसते.' },
      { en: 'Grain quality and market value drop.', mr: 'दाण्यांचा दर्जा व बाजारभाव कमी होतो.' },
    ],
    favorableConditions: [
      { en: 'Rain and high humidity while grain is maturing.', mr: 'दाणे पक्व होताना पाऊस व जास्त आर्द्रता.' },
      { en: 'Delayed harvest after the crop is ready.', mr: 'पीक तयार झाल्यावर काढणीस उशीर.' },
    ],
    prevention: [
      { en: 'Choose a variety whose maturity avoids late rains.', mr: 'उशिराच्या पावसात न सापडणाऱ्या कालावधीचे वाण निवडा.' },
      { en: 'Harvest on time and dry the grain well.', mr: 'वेळेवर काढणी करा व दाणे चांगले वाळवा.' },
    ],
    management: [
      { en: 'Keep damaged grain separate and ask an expert about safe use and storage.', mr: 'खराब दाणे वेगळे ठेवा व सुरक्षित वापर व साठवणीबाबत तज्ज्ञांचा सल्ला घ्या.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Millets Research; PDKV Akola extension guidance.', mr: 'ICAR-भारतीय भरडधान्य संशोधन संस्था; PDKV अकोला विस्तार मार्गदर्शन.' },
  },
  {
    id: 'jowar-anthracnose',
    cropId: 'jowar',
    name: { en: 'Anthracnose', mr: 'करपा (अँथ्रॅकनोज)' },
    cause: 'fungus',
    symptoms: [
      { en: 'Small reddish-brown or purple spots on leaves.', mr: 'पानांवर लहान लालसर-तपकिरी किंवा जांभळे ठिपके.' },
      { en: 'Spots grow with dark centres; stalk and panicle can be affected.', mr: 'ठिपके मोठे होऊन मध्यभाग गडद होतो; खोड व कणीसही बाधित होऊ शकते.' },
    ],
    favorableConditions: [
      { en: 'Warm, humid weather with repeated wetting of leaves.', mr: 'उष्ण, दमट हवामान व पाने वारंवार ओली होणे.' },
      { en: 'Infected seed and residue carry it between seasons.', mr: 'बाधित बियाणे व अवशेषांमुळे एका हंगामातून दुसऱ्यात जातो.' },
    ],
    prevention: [
      { en: 'Use healthy seed of locally recommended varieties.', mr: 'स्थानिक शिफारस केलेल्या वाणांचे निरोगी बियाणे वापरा.' },
      { en: 'Rotate crops and manage residue after harvest.', mr: 'पिकांची फेरपालट करा व काढणीनंतर अवशेषांचे व्यवस्थापन करा.' },
    ],
    management: [
      { en: 'Monitor affected patches and ask extension staff to confirm.', mr: 'बाधित भागांवर लक्ष ठेवा व विस्तार कर्मचाऱ्यांकडून खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-IIMR sorghum disease resources; PDKV Akola Plant Disease Guide.', mr: 'ICAR-IIMR ज्वारी रोग माहिती; PDKV अकोला रोग मार्गदर्शिका.' },
  },
  {
    id: 'chickpea-fusarium-wilt',
    cropId: 'chickpea',
    name: { en: 'Fusarium Wilt', mr: 'मर रोग' },
    cause: 'fungus',
    symptoms: [
      { en: 'Seedlings or older plants droop, turn yellow and wilt.', mr: 'रोपे किंवा मोठी झाडे मलूल होऊन पिवळी पडतात व सुकतात.' },
      { en: 'Brown discoloration inside the stem when split.', mr: 'खोड चिरल्यास आत तपकिरी रंग दिसतो.' },
    ],
    favorableConditions: [
      { en: 'The fungus lives in soil and crop debris.', mr: 'बुरशी जमिनीत व पिकाच्या अवशेषांत राहते.' },
      { en: 'Warm soil and growing chickpea repeatedly in the same field.', mr: 'उष्ण जमीन व त्याच शेतात वारंवार हरभरा घेणे.' },
    ],
    prevention: [
      { en: 'Grow wilt-resistant varieties and use healthy seed.', mr: 'मर-प्रतिकारक वाण घ्या व निरोगी बियाणे वापरा.' },
      { en: 'Rotate crops and remove badly affected plants.', mr: 'पिकांची फेरपालट करा व जास्त बाधित झाडे काढून टाका.' },
    ],
    management: [
      { en: 'Compare affected and healthy plants and confirm the cause with a local expert.', mr: 'बाधित व निरोगी झाडांची तुलना करा व स्थानिक तज्ज्ञांकडून कारणाची खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Pulses Research; PDKV Akola Plant Disease Guide.', mr: 'ICAR-भारतीय कडधान्य संशोधन संस्था; PDKV अकोला रोग मार्गदर्शिका.' },
  },
  {
    id: 'chickpea-dry-root-rot',
    cropId: 'chickpea',
    name: { en: 'Dry Root Rot', mr: 'कोरडी मूळकूज' },
    cause: 'fungus',
    symptoms: [
      { en: 'Plants dry suddenly, especially in hot, dry weather.', mr: 'विशेषतः उष्ण, कोरड्या हवामानात झाडे अचानक वाळतात.' },
      { en: 'Roots become dry, brittle and dark.', mr: 'मुळे कोरडी, ठिसूळ व काळी पडतात.' },
    ],
    favorableConditions: [
      { en: 'High temperature and low soil moisture at podding.', mr: 'घाटे भरताना जास्त तापमान व कमी ओलावा.' },
      { en: 'The fungus survives in soil and residue.', mr: 'बुरशी जमिनीत व अवशेषांत टिकते.' },
    ],
    prevention: [
      { en: 'Sow on time so podding avoids peak heat.', mr: 'वेळेवर पेरणी करा म्हणजे घाटे भरणे कडक उन्हात येणार नाही.' },
      { en: 'Rotate crops and avoid moisture stress where possible.', mr: 'फेरपालट करा व शक्य तिथे पाण्याचा ताण टाळा.' },
    ],
    management: [
      { en: 'Compare roots of affected and healthy plants and seek local confirmation.', mr: 'बाधित व निरोगी झाडांच्या मुळांची तुलना करा व स्थानिक खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Pulses Research chickpea crop protection resources.', mr: 'ICAR-भारतीय कडधान्य संशोधन संस्था हरभरा पीक संरक्षण माहिती.' },
  },
  {
    id: 'wheat-leaf-rust',
    cropId: 'wheat',
    name: { en: 'Leaf Rust (Brown Rust)', mr: 'तपकिरी तांबेरा' },
    cause: 'fungus',
    symptoms: [
      { en: 'Small orange-brown powdery pustules scattered on leaves.', mr: 'पानांवर विखुरलेले लहान नारिंगी-तपकिरी भुकटीचे फोड.' },
      { en: 'Leaves yellow and lose green area in severe cases.', mr: 'तीव्र प्रादुर्भावात पाने पिवळी पडून हिरवा भाग कमी होतो.' },
    ],
    favorableConditions: [
      { en: 'Moderate temperatures with dew or humid weather.', mr: 'मध्यम तापमान व दव किंवा दमट हवामान.' },
      { en: 'Volunteer wheat keeps the fungus alive locally.', mr: 'आपोआप उगवलेला गहू बुरशी स्थानिक पातळीवर टिकवतो.' },
    ],
    prevention: [
      { en: 'Grow rust-resistant varieties and use clean seed.', mr: 'तांबेरा-प्रतिकारक वाण घ्या व स्वच्छ बियाणे वापरा.' },
      { en: 'Remove volunteer wheat and monitor the crop.', mr: 'आपोआप उगवलेला गहू काढा व पिकावर लक्ष ठेवा.' },
    ],
    management: [
      { en: 'Report fast-spreading rust to an agricultural expert promptly.', mr: 'वेगाने पसरणारा तांबेरा त्वरित कृषी तज्ज्ञांना कळवा.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Wheat and Barley Research.', mr: 'ICAR-भारतीय गहू व जव संशोधन संस्था.' },
  },
  {
    id: 'wheat-stripe-rust',
    cropId: 'wheat',
    name: { en: 'Stripe Rust (Yellow Rust)', mr: 'पिवळा तांबेरा' },
    cause: 'fungus',
    symptoms: [
      { en: 'Yellow pustules arranged in stripes along the leaf.', mr: 'पानाच्या लांबीने रेषांमध्ये पिवळे फोड.' },
      { en: 'Leaves yellow and lose productive area.', mr: 'पाने पिवळी पडून उत्पादक भाग कमी होतो.' },
    ],
    favorableConditions: [
      { en: 'Cool, humid weather.', mr: 'थंड, दमट हवामान.' },
      { en: 'Wind carries spores between nearby fields.', mr: 'वाऱ्याने बीजाणू जवळच्या शेतात पसरतात.' },
    ],
    prevention: [
      { en: 'Grow varieties recommended for your region and monitor regularly.', mr: 'आपल्या भागासाठी शिफारस केलेले वाण घ्या व नियमित पाहणी करा.' },
      { en: 'Confirm before acting: other causes can also yellow leaves.', mr: 'कृती करण्यापूर्वी खात्री करा: इतर कारणांनीही पाने पिवळी पडतात.' },
    ],
    management: [
      { en: 'Contact wheat scientists or extension workers when rust is confirmed.', mr: 'तांबेरा निश्चित झाल्यास गहू शास्त्रज्ञ किंवा विस्तार कर्मचाऱ्यांशी संपर्क साधा.' },
    ],
    sourceNote: { en: 'ICAR-IIWBR Research Bulletin No. 35 and crop-health advisories.', mr: 'ICAR-IIWBR संशोधन पुस्तिका क्र. 35 व पीक आरोग्य सल्ले.' },
  },
  {
    id: 'safflower-alternaria-leaf-spot',
    cropId: 'safflower',
    name: { en: 'Alternaria Leaf Spot', mr: 'पानावरील ठिपके (अल्टरनेरिया)' },
    cause: 'fungus',
    symptoms: [
      { en: 'Brown spots on leaves that enlarge over time.', mr: 'पानांवर तपकिरी ठिपके जे हळूहळू मोठे होतात.' },
      { en: 'Older spots show darker margins or rings.', mr: 'जुन्या ठिपक्यांना गडद कडा किंवा वलये दिसतात.' },
    ],
    favorableConditions: [
      { en: 'Humid weather and long leaf wetness.', mr: 'दमट हवामान व पाने दीर्घकाळ ओली राहणे.' },
      { en: 'Infected residue carries the disease to the next crop.', mr: 'बाधित अवशेषांमुळे रोग पुढील पिकात येतो.' },
    ],
    prevention: [
      { en: 'Use healthy seed and rotate safflower with unrelated crops.', mr: 'निरोगी बियाणे वापरा व करडईची इतर पिकांसोबत फेरपालट करा.' },
      { en: 'Remove infected residue after harvest.', mr: 'काढणीनंतर बाधित अवशेष काढून टाका.' },
    ],
    management: [
      { en: 'Monitor the spread and consult extension staff before treatment.', mr: 'प्रसारावर लक्ष ठेवा व उपचारापूर्वी विस्तार कर्मचाऱ्यांचा सल्ला घ्या.' },
    ],
    sourceNote: { en: 'PDKV Akola Plant Disease Guide; ICAR oilseed extension resources.', mr: 'PDKV अकोला रोग मार्गदर्शिका; ICAR तेलबिया विस्तार माहिती.' },
  },
  {
    id: 'safflower-rust',
    cropId: 'safflower',
    name: { en: 'Rust', mr: 'तांबेरा' },
    cause: 'fungus',
    symptoms: [
      { en: 'Rust-coloured powdery pustules on leaves and green parts.', mr: 'पाने व हिरव्या भागांवर गंजासारख्या रंगाचे भुकटीचे फोड.' },
      { en: 'Severe infection weakens the crop.', mr: 'तीव्र प्रादुर्भावाने पीक कमकुवत होते.' },
    ],
    favorableConditions: [
      { en: 'Humid weather and repeated leaf wetness.', mr: 'दमट हवामान व पाने वारंवार ओली होणे.' },
      { en: 'Infected plant material provides spores.', mr: 'बाधित झाडांचे भाग बीजाणूंचा स्रोत ठरतात.' },
    ],
    prevention: [
      { en: 'Use recommended varieties and inspect regularly.', mr: 'शिफारस केलेले वाण वापरा व नियमित पाहणी करा.' },
      { en: 'Do not carry diseased material to other fields.', mr: 'रोगट भाग इतर शेतात नेऊ नका.' },
    ],
    management: [
      { en: 'Get confirmation from oilseed extension staff before treatment.', mr: 'उपचारापूर्वी तेलबिया विस्तार कर्मचाऱ्यांकडून खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-Indian Institute of Oilseeds Research; PDKV Akola Plant Disease Guide.', mr: 'ICAR-भारतीय तेलबिया संशोधन संस्था; PDKV अकोला रोग मार्गदर्शिका.' },
  },
  {
    id: 'rice-blast',
    cropId: 'rice',
    name: { en: 'Blast', mr: 'करपा (ब्लास्ट)' },
    cause: 'fungus',
    symptoms: [
      { en: 'Eye-shaped spots with grey centres and brown edges on leaves.', mr: 'पानांवर राखाडी मध्य व तपकिरी कडा असलेले डोळ्याच्या आकाराचे ठिपके.' },
      { en: 'Neck blast: the stem below the panicle turns black and grains stay empty.', mr: 'मान करपा: लोंबीखालील भाग काळा पडतो व दाणे पोचट राहतात.' },
    ],
    favorableConditions: [
      { en: 'High humidity, cool nights and long dew periods.', mr: 'जास्त आर्द्रता, थंड रात्री व दीर्घकाळ दव.' },
      { en: 'Too much nitrogen fertilizer.', mr: 'नत्रयुक्त खताचा अतिवापर.' },
    ],
    prevention: [
      { en: 'Grow blast-tolerant varieties recommended for Konkan or your region.', mr: 'कोकण किंवा आपल्या भागासाठी शिफारस केलेले करपा-सहनशील वाण घ्या.' },
      { en: 'Apply nitrogen in split doses, not all at once.', mr: 'नत्र एकदम न देता विभागून द्या.' },
    ],
    management: [
      { en: 'Check the crop at tillering and heading; confirm with Krishi Sevak or KVK before spraying.', mr: 'फुटवे व लोंबी येताना पाहणी करा; फवारणीपूर्वी कृषी सेवक किंवा KVK कडून खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-National Rice Research Institute; Dr. BSKKV Dapoli rice guidance.', mr: 'ICAR-राष्ट्रीय भात संशोधन संस्था; डॉ. बाळासाहेब सावंत कोकण कृषी विद्यापीठ भात मार्गदर्शन.' },
  },
  {
    id: 'bajra-downy-mildew',
    cropId: 'bajra',
    name: { en: 'Downy Mildew (Green Ear)', mr: 'केवडा / गोसावी रोग' },
    cause: 'oomycete',
    symptoms: [
      { en: 'Yellow streaks on leaves with white downy growth underneath.', mr: 'पानांवर पिवळ्या रेषा व खालच्या बाजूस पांढरी लव.' },
      { en: 'Ears turn into twisted green leafy structures instead of grain.', mr: 'कणसात दाण्यांऐवजी हिरवी पानासारखी वेडीवाकडी रचना तयार होते.' },
    ],
    favorableConditions: [
      { en: 'High humidity and moderate temperatures after sowing.', mr: 'पेरणीनंतर जास्त आर्द्रता व मध्यम तापमान.' },
      { en: 'Resting spores survive in soil from infected crops.', mr: 'बाधित पिकातील सुप्त बीजाणू जमिनीत टिकतात.' },
    ],
    prevention: [
      { en: 'Sow downy-mildew-resistant hybrids and treated seed.', mr: 'केवडा-प्रतिकारक संकरित वाण व बीजप्रक्रिया केलेले बियाणे पेरा.' },
      { en: 'Pull out and destroy infected plants early.', mr: 'बाधित झाडे लवकर उपटून नष्ट करा.' },
    ],
    management: [
      { en: 'Avoid sowing bajra in the same field every year; confirm with local experts.', mr: 'दरवर्षी त्याच शेतात बाजरी घेणे टाळा; स्थानिक तज्ज्ञांकडून खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-AICRP on Pearl Millet; MPKV Rahuri pearl millet guidance.', mr: 'ICAR-बाजरी संशोधन प्रकल्प; MPKV राहुरी बाजरी मार्गदर्शन.' },
  },
  {
    id: 'groundnut-tikka',
    cropId: 'groundnut',
    name: { en: 'Tikka (Early and Late Leaf Spot)', mr: 'टिक्का (पानावरील ठिपके)' },
    cause: 'fungus',
    symptoms: [
      { en: 'Round brown spots, often with a yellow ring, on leaves.', mr: 'पानांवर गोल तपकिरी ठिपके, अनेकदा पिवळ्या वलयासह.' },
      { en: 'Later, darker spots and heavy leaf fall before harvest.', mr: 'नंतर गडद ठिपके व काढणीपूर्वी मोठ्या प्रमाणात पानगळ.' },
    ],
    favorableConditions: [
      { en: 'Warm, humid weather with long leaf wetness.', mr: 'उष्ण, दमट हवामान व पाने दीर्घकाळ ओली राहणे.' },
      { en: 'Growing groundnut in the same field season after season.', mr: 'त्याच शेतात हंगामामागून हंगाम भुईमूग घेणे.' },
    ],
    prevention: [
      { en: 'Rotate with cereals and remove volunteer groundnut plants.', mr: 'तृणधान्यांसोबत फेरपालट करा व आपोआप उगवलेली झाडे काढा.' },
      { en: 'Use tolerant varieties recommended for your area.', mr: 'आपल्या भागासाठी शिफारस केलेले सहनशील वाण वापरा.' },
    ],
    management: [
      { en: 'Watch from 30 days after sowing; seek local advice when spots increase.', mr: 'पेरणीनंतर 30 दिवसांपासून लक्ष ठेवा; ठिपके वाढल्यास स्थानिक सल्ला घ्या.' },
    ],
    sourceNote: { en: 'ICAR-Directorate of Groundnut Research; MPKV groundnut guidance.', mr: 'ICAR-भुईमूग संशोधन संचालनालय; MPKV भुईमूग मार्गदर्शन.' },
  },
  {
    id: 'onion-purple-blotch',
    cropId: 'onion',
    name: { en: 'Purple Blotch', mr: 'जांभळा करपा' },
    cause: 'fungus',
    symptoms: [
      { en: 'Small white sunken spots that turn purple with a yellow border.', mr: 'लहान पांढरे खोलगट ठिपके जे पिवळ्या कडेसह जांभळे होतात.' },
      { en: 'Leaves dry from the tip and bend; bulbs stay small.', mr: 'पाने टोकाकडून वाळून वाकतात; कांदे लहान राहतात.' },
    ],
    favorableConditions: [
      { en: 'Warm, humid weather with rain or heavy dew, common in Kharif.', mr: 'पाऊस किंवा जास्त दवासह उष्ण, दमट हवामान; खरिपात जास्त.' },
      { en: 'Thrips damage makes infection easier.', mr: 'फुलकिड्यांच्या नुकसानीमुळे प्रादुर्भाव सोपा होतो.' },
    ],
    prevention: [
      { en: 'Use healthy seedlings, proper spacing and crop rotation.', mr: 'निरोगी रोपे, योग्य अंतर व फेरपालट वापरा.' },
      { en: 'Avoid overhead watering late in the day; keep thrips under control.', mr: 'संध्याकाळी वरून पाणी देणे टाळा; फुलकिडे नियंत्रणात ठेवा.' },
    ],
    management: [
      { en: 'Confirm with KVK or ICAR-DOGR guidance before choosing a spray.', mr: 'फवारणी निवडण्यापूर्वी KVK किंवा ICAR-DOGR मार्गदर्शनाने खात्री करा.' },
    ],
    sourceNote: { en: 'ICAR-Directorate of Onion and Garlic Research, Rajgurunagar.', mr: 'ICAR-कांदा व लसूण संशोधन संचालनालय, राजगुरुनगर.' },
  },
]
