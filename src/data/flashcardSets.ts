interface Flashcard {
  front: string;
  back: string;
  hint?: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  category: 'history' | 'science' | 'math' | 'language';
  cards: Flashcard[];
}

export const flashcardSets: FlashcardSet[] = [
  {
    id: 'historical-figures-ancient',
    title: 'Ancient Historical Figures',
    description: 'Important figures from ancient civilizations',
    category: 'history',
    cards: [
      {
        front: 'Julius Caesar',
        back: 'Roman general and statesman who played a critical role in transforming the Roman Republic into the Roman Empire. Famous for his military conquests and being assassinated on the Ides of March (44 BCE).',
        hint: 'Roman leader who crossed the Rubicon'
      },
      {
        front: 'Cleopatra',
        back: 'Last active ruler of the Ptolemaic Kingdom of Egypt. Allied with Julius Caesar and Mark Antony. Known for her intelligence and political skills.',
        hint: 'Last pharaoh of ancient Egypt'
      },
      {
        front: 'Alexander the Great',
        back: 'King of Macedonia who created one of the largest empires in ancient history by age 30. Spread Greek culture across his conquered territories.',
        hint: 'Macedonian king who never lost a battle'
      },
      {
        front: 'Hammurabi',
        back: 'Babylonian king famous for creating one of the earliest and most complete written legal codes (The Code of Hammurabi).',
        hint: 'Created an important ancient law code'
      },
      {
        front: 'Confucius',
        back: 'Chinese philosopher and teacher whose ideas about morality, relationships, and justice greatly influenced East Asian thought and culture.',
        hint: 'Ancient Chinese philosopher who taught about harmony and respect'
      }
    ]
  },
  {
    id: 'historical-figures-medieval',
    title: 'Medieval Historical Figures',
    description: 'Important figures from the Middle Ages',
    category: 'history',
    cards: [
      {
        front: 'Charlemagne',
        back: 'King of the Franks who united much of Western Europe and was crowned as the first Holy Roman Emperor. Known for promoting education and the arts.',
        hint: 'First Holy Roman Emperor'
      },
      {
        front: 'Joan of Arc',
        back: 'French military leader who helped France win crucial battles during the Hundred Years\' War. Known as the "Maid of Orleans".',
        hint: 'French heroine who led armies as a teenager'
      },
      {
        front: 'Marco Polo',
        back: 'Italian merchant and explorer who traveled through Asia along the Silk Road. His book inspired many other explorers.',
        hint: 'Famous traveler to China who wrote about his journeys'
      },
      {
        front: 'William the Conqueror',
        back: 'Norman king who conquered England in 1066, bringing Norman-French culture and changing English society and language.',
        hint: 'Won the Battle of Hastings'
      },
      {
        front: 'Genghis Khan',
        back: 'Founder of the Mongol Empire, which became the largest contiguous land empire in history. Known for military innovations and establishing the Silk Road trade network.',
        hint: 'Founded the Mongol Empire'
      }
    ]
  },
  {
    id: 'science-terms-basic',
    title: 'Basic Science Terms',
    description: 'Essential science vocabulary for 6th grade',
    category: 'science',
    cards: [
      {
        front: 'Cell',
        back: 'The basic unit of life. All living things are made up of one or more cells. Contains organelles that perform specific functions.',
        hint: 'Basic building block of life'
      },
      {
        front: 'Photosynthesis',
        back: 'Process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. Takes place in chloroplasts.',
        hint: 'How plants make their food'
      },
      {
        front: 'Matter',
        back: 'Anything that has mass and takes up space. Can exist in different states: solid, liquid, and gas.',
        hint: 'What everything is made of'
      },
      {
        front: 'Force',
        back: 'A push or pull that can cause an object to start moving, stop moving, or change direction. Measured in Newtons.',
        hint: 'Push or pull on an object'
      },
      {
        front: 'Energy',
        back: 'The ability to do work or cause change. Can exist in different forms like kinetic, potential, thermal, and electrical.',
        hint: 'Ability to make things happen'
      }
    ]
  },
  {
    id: 'science-terms-earth',
    title: 'Earth Science Terms',
    description: 'Important concepts in Earth Science',
    category: 'science',
    cards: [
      {
        front: 'Plate Tectonics',
        back: 'Theory that Earth\'s crust is broken into moving pieces (plates). Explains earthquakes, volcanoes, and mountain formation.',
        hint: 'Moving pieces of Earth\'s crust'
      },
      {
        front: 'Weather',
        back: 'Day-to-day conditions of the atmosphere including temperature, precipitation, wind, and air pressure.',
        hint: 'Daily atmospheric conditions'
      },
      {
        front: 'Climate',
        back: 'Long-term pattern of weather in an area, typically measured over 30 years or more.',
        hint: 'Long-term weather patterns'
      },
      {
        front: 'Erosion',
        back: 'Process by which wind, water, ice, or gravity wears away and moves earth materials from one place to another.',
        hint: 'Wearing away of rock and soil'
      },
      {
        front: 'Atmosphere',
        back: 'Layer of gases surrounding Earth that contains the air we breathe and protects us from harmful radiation.',
        hint: 'Earth\'s blanket of air'
      }
    ]
  }
]; 