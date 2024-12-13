import { Groq } from 'groq-sdk';

const getQuery = (category) => `Generate a list of 30 words that fit the theme of '${category}'. Return the data in a JSON array matching the format specified.

Example Format
{
  "words": ["word1", "word2", "word3"]
}`;

const gameTypes = [
  'Standard',
  'Salesforce',
  'Custom'
];

let standardWords = [
  'People',
  'History',
  'Way',
  'Art',
  'World',
  'Information',
  'Map',
  'Two',
  'Family',
  'Government',
  'Health',
  'System',
  'Computer',
  'Meat',
  'Year',
  'Thanks',
  'Music',
  'Person',
  'Reading',
  'Method',
  'Data',
  'Food',
  'Understanding',
  'Theory',
  'Law',
  'Bird',
  'Literature',
  'Problem',
  'Software',
  'Control',
  'Knowledge',
  'Power',
  'Ability',
  'Economics',
  'Love',
  'Internet',
  'Television',
  'Science',
  'Library',
  'Nature',
  'Fact',
  'Product',
  'Idea',
  'Temperature',
  'Investment',
  'Area',
  'Society',
  'Activity',
  'Story',
  'Industry',
  'Media',
  'Thing',
  'Oven',
  'Community',
  'Definition',
  'Safety',
  'Quality',
  'Development',
  'Language',
  'Management',
  'Player',
  'Variety',
  'Video',
  'Week',
  'Security',
  'Country',
  'Exam',
  'Movie',
  'Organization',
  'Equipment',
  'Physics',
  'Analysis',
  'Policy',
  'Series',
  'Thought',
  'Basis',
  'Boyfriend',
  'Direction',
  'Strategy',
  'Technology',
  'Army',
  'Camera',
  'Freedom',
  'Paper',
  'Environment',
  'Child',
  'Instance',
  'Month',
  'Truth',
  'Marketing',
  'University',
  'Writing',
  'Article',
  'Department',
  'Difference',
  'Goal',
  'News',
  'Audience',
  'Fishing',
  'Growth',
  'Income',
  'Marriage',
  'User',
  'Combination',
  'Failure',
  'Meaning',
  'Medicine',
  'Philosophy',
  'Teacher',
  'Communication',
  'Night',
  'Chemistry',
  'Disease',
  'Disk',
  'Energy',
  'Nation',
  'Road',
  'Role',
  'Soup',
  'Advertising',
  'Location',
  'Success',
  'Addition',
  'Apartment',
  'Education',
  'Math',
  'Moment',
  'Painting',
  'Politics',
  'Attention',
  'Decision',
  'Event',
  'Property',
  'Shopping',
  'Student',
  'Wood',
  'Competition',
  'Distribution',
  'Entertainment',
  'Office',
  'Population',
  'President',
  'Unit',
  'Category',
  'Cigarette',
  'Context',
  'Introduction',
  'Opportunity',
  'Performance',
  'Driver',
  'Flight',
  'Length',
  'Magazine',
  'Newspaper',
  'Relationship',
  'Teaching',
  'Cell',
  'Dealer',
  'Finding',
  'Lake',
  'Member',
  'Message',
  'Phone',
  'Scene',
  'Appearance',
  'Association',
  'Concept',
  'Customer',
  'Death',
  'Discussion',
  'Housing',
  'Inflation',
  'Insurance',
  'Mood',
  'Woman',
  'Advice',
  'Blood',
  'Effort',
  'Expression',
  'Importance',
  'Opinion',
  'Payment',
  'Reality',
  'Responsibility',
  'Situation',
  'Skill',
  'Statement',
  'Wealth',
  'Application',
  'City',
  'County',
  'Depth',
  'Estate',
  'Foundation',
  'Grandmother',
  'Heart',
  'Perspective',
  'Photo',
  'Recipe',
  'Studio',
  'Topic',
  'Collection',
  'Depression',
  'Imagination',
  'Passion',
  'Percentage',
  'Resource',
  'Setting',
  'Ad',
  'Agency',
  'College',
  'Connection',
  'Criticism',
  'Debt',
  'Description',
  'Memory',
  'Patience',
  'Secretary',
  'Solution',
  'Administration',
  'Aspect',
  'Attitude',
  'Director',
  'Personality',
  'Psychology',
  'Recommendation',
  'Response',
  'Selection',
  'Storage',
  'Version',
  'Alcohol',
  'Argument',
  'Complaint',
  'Contract',
  'Emphasis',
  'Highway',
  'Loss',
  'Membership',
  'Possession',
  'Preparation',
  'Steak',
  'Union',
  'Agreement',
  'Cancer',
  'Currency',
  'Employment',
  'Engineering',
  'Entry',
  'Interaction',
  'Mixture',
  'Preference',
  'Region',
  'Republic',
  'Tradition',
  'Virus',
  'Actor',
  'Classroom',
  'Delivery',
  'Device',
  'Difficulty',
  'Drama',
  'Election',
  'Engine',
  'Football',
  'Guidance',
  'Hotel',
  'Owner',
  'Priority',
  'Protection',
  'Suggestion',
  'Tension',
  'Variation',
  'Anxiety',
  'Atmosphere',
  'Awareness',
  'Bath',
  'Bread',
  'Candidate',
  'Climate',
  'Comparison',
  'Confusion',
  'Construction',
  'Elevator',
  'Emotion',
  'Employee',
  'Employer',
  'Guest',
  'Height',
  'Leadership',
  'Mall',
  'Manager',
  'Operation',
  'Recording',
  'Sample',
  'Transportation',
  'Charity',
  'Cousin',
  'Disaster',
  'Editor',
  'Efficiency',
  'Excitement',
  'Extent',
  'Feedback',
  'Guitar',
  'Homework',
  'Leader',
  'Mom',
  'Outcome',
  'Permission',
  'Presentation',
  'Promotion',
  'Reflection',
  'Refrigerator',
  'Resolution',
  'Revenue',
  'Session',
  'Singer',
  'Tennis',
  'Basket',
  'Bonus',
  'Cabinet',
  'Childhood',
  'Church',
  'Clothes',
  'Coffee',
  'Dinner',
  'Drawing',
  'Hair',
  'Hearing',
  'Initiative',
  'Judgment',
  'Lab',
  'Measurement',
  'Mode',
  'Mud',
  'Orange',
  'Poetry',
  'Police',
  'Possibility',
  'Procedure',
  'Queen',
  'Ratio',
  'Relation',
  'Restaurant',
  'Satisfaction',
  'Sector',
  'Signature',
  'Significance',
  'Song',
  'Tooth',
  'Town',
  'Vehicle',
  'Volume',
  'Wife',
  'Accident',
  'Airport',
  'Appointment',
  'Arrival',
  'Assumption',
  'Baseball',
  'Chapter',
  'Committee',
  'Conversation',
  'Database',
  'Enthusiasm',
  'Error',
  'Explanation',
  'Farmer',
  'Gate',
  'Girl',
  'Hall',
  'Historian',
  'Hospital',
  'Injury',
  'Instruction',
  'Maintenance',
  'Manufacturer',
  'Meal',
  'Perception',
  'Pie',
  'Poem',
  'Presence',
  'Proposal',
  'Reception',
  'Replacement',
  'Revolution',
  'River',
  'Son',
  'Speech',
  'Tea',
  'Village',
  'Warning',
  'Winner',
  'Worker',
  'Writer',
  'Assistance',
  'Breath',
  'Buyer',
  'Chest',
  'Chocolate',
  'Conclusion',
  'Contribution',
  'Cookie',
  'Courage',
  'Dad',
  'Desk',
  'Drawer',
  'Establishment',
  'Examination',
  'Garbage',
  'Grocery',
  'Honey',
  'Impression',
  'Improvement',
  'Independence',
  'Insect',
  'Inspection',
  'Inspector',
  'King',
  'Ladder',
  'Menu',
  'Penalty',
  'Piano',
  'Potato',
  'Profession',
  'Professor',
  'Quantity',
  'Reaction',
  'Requirement',
  'Salad',
  'Sister',
  'Supermarket',
  'Tongue',
  'Weakness',
  'Wedding',
  'Affair',
  'Ambition',
  'Analyst',
  'Apple',
  'Assignment',
  'Assistant',
  'Bathroom',
  'Bedroom',
  'Beer',
  'Birthday',
  'Celebration',
  'Championship',
  'Cheek',
  'Client',
  'Consequence',
  'Departure',
  'Diamond',
  'Dirt',
  'Ear',
  'Fortune',
  'Friendship',
  'Funeral',
  'Gene',
  'Girlfriend',
  'Hat',
  'Indication',
  'Intention',
  'Lady',
  'Midnight',
  'Negotiation',
  'Obligation',
  'Passenger',
  'Pizza',
  'Platform',
  'Poet',
  'Pollution',
  'Recognition',
  'Reputation',
  'Shirt',
  'Sir',
  'Speaker',
  'Stranger',
  'Surgery',
  'Sympathy',
  'Tale',
  'Throat',
  'Trainer',
  'Uncle',
  'Youth',
  'Time',
  'Work',
  'Film',
  'Water',
  'Money',
  'Example',
  'While',
  'Business',
  'Study',
  'Game',
  'Life',
  'Form',
  'Air',
  'Day',
  'Place',
  'Number',
  'Part',
  'Field',
  'Fish',
  'Back',
  'Process',
  'Heat',
  'Hand',
  'Experience',
  'Job',
  'Book',
  'End',
  'Point',
  'Type',
  'Home',
  'Economy',
  'Value',
  'Body',
  'Market',
  'Guide',
  'Interest',
  'State',
  'Radio',
  'Course',
  'Company',
  'Price',
  'Size',
  'Card',
  'List',
  'Mind',
  'Trade',
  'Line',
  'Care',
  'Group',
  'Risk',
  'Word',
  'Fat',
  'Force',
  'Key',
  'Light',
  'Training',
  'Name',
  'School',
  'Top',
  'Amount',
  'Level',
  'Order',
  'Practice',
  'Research',
  'Sense',
  'Service',
  'Piece',
  'Web',
  'Boss',
  'Sport',
  'Fun',
  'House',
  'Page',
  'Term',
  'Test',
  'Answer',
  'Sound',
  'Focus',
  'Matter',
  'Kind',
  'Soil',
  'Board',
  'Oil',
  'Picture',
  'Access',
  'Garden',
  'Range',
  'Rate',
  'Reason',
  'Future',
  'Site',
  'Demand',
  'Exercise',
  'Image',
  'Case',
  'Cause',
  'Coast',
  'Action',
  'Age',
  'Bad',
  'Boat',
  'Record',
  'Result',
  'Section',
  'Building',
  'Mouse',
  'Cash',
  'Class',
  'Nothing',
  'Period',
  'Plan',
  'Store',
  'Tax',
  'Side',
  'Subject',
  'Space',
  'Rule',
  'Stock',
  'Weather',
  'Chance',
  'Figure',
  'Man',
  'Model',
  'Source',
  'Beginning',
  'Earth',
  'Program',
  'Chicken',
  'Design',
  'Feature',
  'Head',
  'Material',
  'Purpose',
  'Question',
  'Rock',
  'Salt',
  'Act',
  'Birth',
  'Car',
  'Dog',
  'Object',
  'Scale',
  'Sun',
  'Note',
  'Profit',
  'Rent',
  'Speed',
  'Style',
  'War',
  'Bank',
  'Craft',
  'Half',
  'Inside',
  'Outside',
  'Standard',
  'Bus',
  'Exchange',
  'Eye',
  'Fire',
  'Position',
  'Pressure',
  'Stress',
  'Advantage',
  'Benefit',
  'Box',
  'Frame',
  'Issue',
  'Step',
  'Cycle',
  'Face',
  'Item',
  'Metal',
  'Paint',
  'Review',
  'Room',
  'Screen',
  'Structure',
  'View',
  'Account',
  'Ball',
  'Discipline',
  'Medium',
  'Share',
  'Balance',
  'Bit',
  'Black',
  'Bottom',
  'Choice',
  'Gift',
  'Impact',
  'Machine',
  'Shape',
  'Tool',
  'Wind',
  'Address',
  'Average',
  'Career',
  'Culture',
  'Morning',
  'Pot',
  'Sign',
  'Table',
  'Task',
  'Condition',
  'Contact',
  'Credit',
  'Egg',
  'Hope',
  'Ice',
  'Network',
  'North',
  'Square',
  'Attempt',
  'Date',
  'Effect',
  'Link',
  'Post',
  'Star',
  'Voice',
  'Capital',
  'Challenge',
  'Friend',
  'Self',
  'Shot',
  'Brush',
  'Couple',
  'Debate',
  'Exit',
  'Front',
  'Function',
  'Lack',
  'Living',
  'Plant',
  'Plastic',
  'Spot',
  'Summer',
  'Taste',
  'Theme',
  'Track',
  'Wing',
  'Brain',
  'Button',
  'Click',
  'Desire',
  'Foot',
  'Gas',
  'Influence',
  'Notice',
  'Rain',
  'Wall',
  'Base',
  'Damage',
  'Distance',
  'Feeling',
  'Pair',
  'Savings',
  'Staff',
  'Sugar',
  'Target',
  'Text',
  'Animal',
  'Author',
  'Budget',
  'Discount',
  'File',
  'Ground',
  'Lesson',
  'Minute',
  'Officer',
  'Phase',
  'Reference',
  'Register',
  'Sky',
  'Stage',
  'Stick',
  'Title',
  'Trouble',
  'Bowl',
  'Bridge',
  'Campaign',
  'Character',
  'Club',
  'Edge',
  'Evidence',
  'Fan',
  'Letter',
  'Lock',
  'Maximum',
  'Novel',
  'Option',
  'Pack',
  'Park',
  'Plenty',
  'Quarter',
  'Skin',
  'Sort',
  'Weight',
  'Baby',
  'Background',
  'Carry',
  'Dish',
  'Factor',
  'Fruit',
  'Glass',
  'Joint',
  'Master',
  'Muscle',
  'Red',
  'Strength',
  'Traffic',
  'Trip',
  'Vegetable',
  'Appeal',
  'Chart',
  'Gear',
  'Ideal',
  'Kitchen',
  'Land',
  'Log',
  'Mother',
  'Net',
  'Party',
  'Principle',
  'Relative',
  'Sale',
  'Season',
  'Signal',
  'Spirit',
  'Street',
  'Tree',
  'Wave',
  'Belt',
  'Bench',
  'Commission',
  'Copy',
  'Drop',
  'Minimum',
  'Path',
  'Progress',
  'Project',
  'Sea',
  'South',
  'Status',
  'Stuff',
  'Ticket',
  'Tour',
  'Angle',
  'Blue',
  'Breakfast',
  'Confidence',
  'Daughter',
  'Degree',
  'Doctor',
  'Dot',
  'Dream',
  'Duty',
  'Essay',
  'Father',
  'Fee',
  'Finance',
  'Hour',
  'Juice',
  'Limit',
  'Luck',
  'Milk',
  'Mouth',
  'Peace',
  'Pipe',
  'Seat',
  'Stable',
  'Storm',
  'Substance',
  'Team',
  'Trick',
  'Afternoon',
  'Bat',
  'Beach',
  'Blank',
  'Catch',
  'Chain',
  'Consideration',
  'Cream',
  'Crew',
  'Detail',
  'Gold',
  'Interview',
  'Kid',
  'Mark',
  'Match',
  'Mission',
  'Pain',
  'Pleasure',
  'Score',
  'Screw',
  'Sex',
  'Shop',
  'Shower',
  'Suit',
  'Tone',
  'Window',
  'Agent',
  'Band',
  'Block',
  'Bone',
  'Calendar',
  'Cap',
  'Coat',
  'Contest',
  'Corner',
  'Court',
  'Cup',
  'District',
  'Door',
  'East',
  'Finger',
  'Garage',
  'Guarantee',
  'Hole',
  'Hook',
  'Implement',
  'Layer',
  'Lecture',
  'Lie',
  'Manner',
  'Meeting',
  'Nose',
  'Parking',
  'Partner',
  'Profile',
  'Respect',
  'Rice',
  'Routine',
  'Schedule',
  'Swimming',
  'Telephone',
  'Tip',
  'Winter',
  'Airline',
  'Bag',
  'Battle',
  'Bed',
  'Bill',
  'Bother',
  'Cake',
  'Code',
  'Curve',
  'Designer',
  'Dimension',
  'Dress',
  'Ease',
  'Emergency',
  'Evening',
  'Extension',
  'Farm',
  'Fight',
  'Gap',
  'Grade',
  'Holiday',
  'Horror',
  'Horse',
  'Host',
  'Husband',
  'Loan',
  'Mistake',
  'Mountain',
  'Nail',
  'Noise',
  'Occasion',
  'Package',
  'Patient',
  'Pause',
  'Phrase',
  'Proof',
  'Race',
  'Relief',
  'Sand',
  'Sentence',
  'Shoulder',
  'Smoke',
  'Stomach',
  'String',
  'Tourist',
  'Towel',
  'Vacation',
  'West',
  'Wheel',
  'Wine',
  'Arm',
  'Aside',
  'Associate',
  'Bet',
  'Blow',
  'Border',
  'Branch',
  'Breast',
  'Brother',
  'Buddy',
  'Bunch',
  'Chip',
  'Coach',
  'Cross',
  'Document',
  'Draft',
  'Dust',
  'Expert',
  'Floor',
  'God',
  'Golf',
  'Habit',
  'Iron',
  'Judge',
  'Knife',
  'Landscape',
  'League',
  'Mail',
  'Mess',
  'Native',
  'Opening',
  'Parent',
  'Pattern',
  'Pin',
  'Pool',
  'Pound',
  'Request',
  'Salary',
  'Shame',
  'Shelter',
  'Shoe',
  'Silver',
  'Tackle',
  'Tank',
  'Trust',
  'Assist',
  'Bake',
  'Bar',
  'Bell',
  'Bike',
  'Blame',
  'Boy',
  'Brick',
  'Chair',
  'Closet',
  'Clue',
  'Collar',
  'Comment',
  'Conference',
  'Devil',
  'Diet',
  'Fear',
  'Fuel',
  'Glove',
  'Jacket',
  'Lunch',
  'Monitor',
  'Mortgage',
  'Nurse',
  'Pace',
  'Panic',
  'Peak',
  'Plane',
  'Reward',
  'Row',
  'Sandwich',
  'Shock',
  'Spite',
  'Spray',
  'Surprise',
  'Till',
  'Transition',
  'Weekend',
  'Welcome',
  'Yard',
  'Alarm',
  'Bend',
  'Bicycle',
  'Bite',
  'Blind',
  'Bottle',
  'Cable',
  'Candle',
  'Clerk',
  'Cloud',
  'Concert',
  'Counter',
  'Flower',
  'Grandfather',
  'Harm',
  'Knee',
  'Lawyer',
  'Leather',
  'Load',
  'Mirror',
  'Neck',
  'Pension',
  'Plate',
  'Purple',
  'Ruin',
  'Ship',
  'Skirt',
  'Slice',
  'Snow',
  'Specialist',
  'Stroke',
  'Switch',
  'Trash',
  'Tune',
  'Zone',
  'Anger',
  'Award',
  'Bid',
  'Bitter',
  'Boot',
  'Bug',
  'Camp',
  'Candy',
  'Carpet',
  'Cat',
  'Champion',
  'Channel',
  'Clock',
  'Comfort',
  'Cow',
  'Crack',
  'Engineer',
  'Entrance',
  'Fault',
  'Grass',
  'Guy',
  'Hell',
  'Highlight',
  'Incident',
  'Island',
  'Joke',
  'Jury',
  'Leg',
  'Lip',
  'Mate',
  'Motor',
  'Nerve',
  'Passage',
  'Pen',
  'Pride',
  'Priest',
  'Prize',
  'Promise',
  'Resident',
  'Resort',
  'Ring',
  'Roof',
  'Rope',
  'Sail',
  'Scheme',
  'Script',
  'Sock',
  'Station',
  'Toe',
  'Tower',
  'Truck',
  'Witness',
  //'A',
  //'You',
  'It',
  'Can',
  'Will',
  //'If',
  'One',
  'Many',
  'Most',
  'Other',
  'Use',
  'Make',
  'Good',
  'Look',
  'Help',
  'Go',
  'Great',
  'Being',
  'Few',
  'Might',
  'Still',
  'Public',
  'Read',
  'Keep',
  'Start',
  'Give',
  'Human',
  'Local',
  'General',
  'She',
  'Specific',
  'Long',
  'Play',
  'Feel',
  'High',
  'Tonight',
  'Put',
  'Common',
  'Set',
  'Change',
  'Simple',
  'Past',
  'Big',
  'Possible',
  'Particular',
  'Today',
  'Major',
  'Personal',
  'Current',
  'National',
  'Cut',
  'Natural',
  'Physical',
  'Show',
  'Try',
  'Check',
  'Second',
  'Call',
  'Move',
  'Pay',
  'Let',
  'Increase',
  'Single',
  'Individual',
  'Turn',
  'Ask',
  'Buy',
  'Guard',
  'Hold',
  'Main',
  'Offer',
  'Potential',
  'Professional',
  'International',
  'Travel',
  'Cook',
  'Alternative',
  'Following',
  'Special',
  'Working',
  'Whole',
  'Dance',
  'Excuse',
  'Cold',
  'Commercial',
  'Low',
  'Purchase',
  'Deal',
  'Primary',
  'Worth',
  'Fall',
  'Necessary',
  'Positive',
  'Produce',
  'Search',
  'Present',
  'Spend',
  'Talk',
  'Creative',
  'Tell',
  'Cost',
  'Drive',
  'Green',
  'Support',
  'Glad',
  'Remove',
  'Return',
  'Run',
  'Complex',
  'Due',
  'Effective',
  'Middle',
  'Regular',
  'Reserve',
  'Independent',
  'Leave',
  'Original',
  'Reach',
  'Rest',
  'Serve',
  'Watch',
  'Beautiful',
  'Charge',
  'Active',
  'Break',
  'Negative',
  'Safe',
  'Stay',
  'Visit',
  'Visual',
  'Affect',
  'Cover',
  'Report',
  'Rise',
  'Walk',
  'White',
  'Beyond',
  'Junior',
  'Pick',
  'Unique',
  'Anything',
  'Classic',
  'Final',
  'Lift',
  'Mix',
  'Private',
  'Stop',
  'Teach',
  'Western',
  'Concern',
  'Familiar',
  'Fly',
  'Official',
  'Broad',
  'Comfortable',
  'Gain',
  'Maybe',
  'Rich',
  'Save',
  'Stand',
  'Young',
  'Fail',
  'Heavy',
  'Hello',
  'Lead',
  'Listen',
  'Valuable',
  'Worry',
  'Handle',
  'Leading',
  'Meet',
  'Release',
  'Sell',
  'Finish',
  'Normal',
  'Press',
  'Ride',
  'Secret',
  'Spread',
  'Spring',
  'Tough',
  'Wait',
  'Brown',
  'Deep',
  'Display',
  'Flow',
  'Hit',
  'Objective',
  'Shoot',
  'Touch',
  'Cancel',
  'Chemical',
  'Cry',
  'Dump',
  'Extreme',
  'Push',
  'Conflict',
  'Eat',
  'Fill',
  'Formal',
  'Jump',
  'Kick',
  'Opposite',
  'Pass',
  'Pitch',
  'Remote',
  'Total',
  'Treat',
  'Vast',
  'Abuse',
  'Beat',
  'Burn',
  'Deposit',
  'Print',
  'Raise',
  'Sleep',
  'Somewhere',
  'Advance',
  'Anywhere',
  'Consist',
  'Dark',
  'Double',
  'Draw',
  'Equal',
  'Fix',
  'Hire',
  'Internal',
  'Join',
  'Kill',
  'Sensitive',
  'Tap',
  'Win',
  'Attack',
  'Claim',
  'Constant',
  'Drag',
  'Drink',
  'Guess',
  'Minor',
  'Pull',
  'Raw',
  'Soft',
  'Solid',
  'Wear',
  'Weird',
  'Wonder',
  'Annual',
  'Count',
  'Dead',
  'Doubt',
  'Feed',
  'Forever',
  'Impress',
  'Nobody',
  'Repeat',
  'Round',
  'Sing',
  'Slide',
  'Strip',
  'Whereas',
  'Wish',
  'Combine',
  'Command',
  'Dig',
  'Divide',
  'Equivalent',
  'Hang',
  'Hunt',
  'Initial',
  'March',
  'Mention',
  'Smell',
  'Spiritual',
  'Survey',
  'Tie',
  'Adult',
  'Brief',
  'Crazy',
  'Escape',
  'Gather',
  'Hate',
  'Prior',
  'Repair',
  'Rough',
  'Sad',
  'Scratch',
  'Sick',
  'Strike',
  'Employ',
  'External',
  'Hurt',
  'Illegal',
  'Laugh',
  'Lay',
  'Mobile',
  'Nasty',
  'Ordinary',
  'Respond',
  'Royal',
  'Senior',
  'Split',
  'Strain',
  'Struggle',
  'Swim',
  'Train',
  'Upper',
  'Wash',
  'Yellow',
  'Convert',
  'Crash',
  'Dependent',
  'Fold',
  'Funny',
  'Grab',
  'Hide',
  'Miss',
  'Permit',
  'Quote',
  'Recover',
  'Resolve',
  'Roll',
  'Sink',
  'Slip',
  'Spare',
  'Suspect',
  'Sweet',
  'Swing',
  'Twist',
  'Upstairs',
  'Usual',
  'Abroad',
  'Brave',
  'Calm',
  'Concentrate',
  'Estimate',
  'Grand',
  'Male',
  'Mine',
  'Prompt',
  'Quiet',
  'Refuse',
  'Regret',
  'Reveal',
  'Rush',
  'Shake',
  'Shift',
  'Shine',
  'Steal',
  'Suck',
  'Surround',
  'Anybody',
  'Bear',
  'Brilliant',
  'Dare',
  'Dear',
  'Delay',
  'Drunk'
];

let salesforceWords = [
  'Apex',
  'Aura',
  'Batch',
  'LWC',
  'Flow',
  'Lightning',
  'Process Builder',
  'Workflow Rule',
  'Trigger',
  'Visualforce',
  'Community',
  'Developer',
  'Admin',
  'Sales',
  'Service',
  'Marketing',
  'Commerce',
  'Analytics',
  'Einstein',
  'Heroku',
  'Mulesoft',
  'Tableau',
  'OmniStudio',
  'Orchestrator',
  'Object',
  'Record',
  'Field',
  'Formula',
  'Validation',
  'Record Type',
  'Page Layout',
  'Sharing',
  'Permission Set',
  'Profile',
  'Role',
  'Queue',
  'Public Group',
  'Queueable',
  'Future',
  'List View',
  'Report',
  'Dashboard',
  'Lightning Page',
  'User',
  'Account',
  'Contact',
  'Lead',
  'Opportunity',
  'Case',
  'Campaign',
  'Contract',
  'Asset',
  'Product',
  'Price Book',
  'Order',
  'Quote',
  'Invoice',
  'Entitlement',
  'Approval Process',
  'Chatter',
  'File',
  'Folder',
  'Email Template',
  'Recursion',
  'Governor Limit',
  'SOQL',
  'SOSL',
  'DML',
  'Assignment Rule',
  'Picklist',
  'Multi-Select Picklist',
  'Lookup',
  'Master-Detail',
  'Roll-Up Summary',
  'Formula',
  'Field History Tracking',
  'App Builder',
  'AppExchange',
  'Asynchronous',
  'Bulk API',
  'Knowledge',
  'CSS',
  'Code Coverage',
  'Developer Console',
  'Tab',
  'Platform Event',
  'External Object',
  'Field History Tracking',
  'Field-Level Security',
  'HTML',
  'Import Wizard',
  'Organization Wide Default',
  'Sandbox',
  'Org',
  'System Administrator',
  'Data Loader',
  'Text Area',
  'Deployment',
  'Metadata',
  'Unit Test',
  'Static Resource',
  'Custom Metadata',
  'Custom Setting',
  'Custom Label',
  'UAT',
  'QA',
  'Web-to-Lead',
  'Web-to-Case',
  'XML'
];

async function fetchCustomWords(category, apiKey) {
  const groq = new Groq({
    apiKey,
    dangerouslyAllowBrowser: true
  });

  const query = getQuery(category);
  const messages = [
    {
      role: 'user',
      content: query
    }
  ]
  const response = await groq.chat.completions.create({
    messages,
    model: 'llama3-8b-8192',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
    response_format: {
      "type": "json_object"
    }
  });

  let words = JSON.parse(response.choices[0].message.content);

  if(typeof words !== 'object' || !Array.isArray(words?.words)) {
    throw new Error('Invalid response from API');
  }

  //Capitalize the first letter of each word
  return words.words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
}

async function* wordGenerator(gameType = 'Standard', customCategory = 'dog', apiKey = '') {
  let words;
  switch(gameType) {
    case 'Salesforce':
      words = Object.assign([], salesforceWords);
      break;
    case 'Custom':
      if (customCategory && apiKey) {
        words = await fetchCustomWords(customCategory, apiKey);
      } else {
        words = [];
      }
      break;
    default:
      words = Object.assign([], standardWords);
      break;
  }

  while(true) {
    if(words.length > 0) {
      const RAND_INDEX = Math.floor(Math.random() * words.length);
      const RAND_WORD = words[RAND_INDEX];
      words.splice(RAND_INDEX, 1);
      yield RAND_WORD;
    } else {
      yield '';
    }
  }
}

export { gameTypes, wordGenerator };