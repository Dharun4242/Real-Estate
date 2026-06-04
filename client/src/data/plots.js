// Sample plot inventory for PoesGarden Real Estate.
// In production this would come from an API / CMS. Each plot has a size
// category so the UI can "differentiate by plot size" as required.
//
// sizeCategory is derived from `area` (sq.ft):
//   Compact  : < 1000
//   Standard : 1000 – 1799
//   Premium  : 1800 – 2999
//   Villa    : >= 3000

export const ADVANCE_AMOUNT = 2000 // ₹ advance to block a plot

export const LOCATIONS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Hosur',
]

export const SIZE_CATEGORIES = [
  { key: 'Compact', label: 'Compact', range: 'Below 1000 sq.ft' },
  { key: 'Standard', label: 'Standard', range: '1000 – 1799 sq.ft' },
  { key: 'Premium', label: 'Premium', range: '1800 – 2999 sq.ft' },
  { key: 'Villa', label: 'Villa', range: '3000+ sq.ft' },
]

export function categoryForArea(area) {
  if (area < 1000) return 'Compact'
  if (area < 1800) return 'Standard'
  if (area < 3000) return 'Premium'
  return 'Villa'
}

const IMG = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`

const raw = [
  {
    id: 'PG-CHN-001',
    title: 'Poes Garden Greens',
    location: 'Chennai',
    area: 'Thiruvanmiyur, OMR',
    sqft: 1200,
    pricePerSqft: 7500,
    facing: 'East',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1500382017468-9049fed747ef'),
    highlights: ['Gated community', '40ft road', 'OMR IT corridor'],
  },
  {
    id: 'PG-CHN-002',
    title: 'Lakeview Enclave',
    location: 'Chennai',
    area: 'Tambaram West',
    sqft: 800,
    pricePerSqft: 4200,
    facing: 'North',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1448630360428-65456885c650'),
    highlights: ['Near GST Road', 'Lake-facing', 'Bank loan available'],
  },
  {
    id: 'PG-CHN-003',
    title: 'Marina Heights',
    location: 'Chennai',
    area: 'Sholinganallur',
    sqft: 2400,
    pricePerSqft: 8900,
    facing: 'East',
    status: 'available',
    approval: 'RERA',
    image: IMG('photo-1605146769289-440113cc3d00'),
    highlights: ['Corner plot', 'Clubhouse', 'Ready to register'],
  },
  {
    id: 'PG-CBE-001',
    title: 'Kovai Garden City',
    location: 'Coimbatore',
    area: 'Saravanampatti',
    sqft: 1500,
    pricePerSqft: 3600,
    facing: 'West',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1592595896551-12b371d546d5'),
    highlights: ['IT park nearby', 'Avinashi Road', 'Park view'],
  },
  {
    id: 'PG-CBE-002',
    title: 'Western Ghats Retreat',
    location: 'Coimbatore',
    area: 'Thudiyalur',
    sqft: 3200,
    pricePerSqft: 2900,
    facing: 'North-East',
    status: 'available',
    approval: 'RERA',
    image: IMG('photo-1416331108676-a22ccb276e35'),
    highlights: ['Hill view', 'Villa plot', 'Gated security'],
  },
  {
    id: 'PG-MDU-001',
    title: 'Temple City Plots',
    location: 'Madurai',
    area: 'Othakadai',
    sqft: 1000,
    pricePerSqft: 2400,
    facing: 'South',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1542889601-399c4f3a8402'),
    highlights: ['Ring road', 'Temple proximity', 'Wide layout'],
  },
  {
    id: 'PG-MDU-002',
    title: 'Vaigai Riverside',
    location: 'Madurai',
    area: 'Thiruparankundram',
    sqft: 1800,
    pricePerSqft: 2700,
    facing: 'East',
    status: 'sold',
    approval: 'DTCP',
    image: IMG('photo-1568605114967-8130f3a36994'),
    highlights: ['River-facing', 'Premium layout', 'Clear title'],
  },
  {
    id: 'PG-TRY-001',
    title: 'Rockfort View Estate',
    location: 'Tiruchirappalli',
    area: 'Srirangam',
    sqft: 900,
    pricePerSqft: 2100,
    facing: 'North',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1564013799919-ab600027ffc6'),
    highlights: ['Affordable', 'NH-45 access', 'Compact home plot'],
  },
  {
    id: 'PG-SLM-001',
    title: 'Steel City Layout',
    location: 'Salem',
    area: 'Hasthampatti',
    sqft: 1600,
    pricePerSqft: 1900,
    facing: 'West',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1570129477492-45c003edd2be'),
    highlights: ['School zone', 'Tar road', 'Drainage ready'],
  },
  {
    id: 'PG-TVL-001',
    title: 'Nellai Royal Gardens',
    location: 'Tirunelveli',
    area: 'Palayamkottai',
    sqft: 2000,
    pricePerSqft: 1700,
    facing: 'East',
    status: 'available',
    approval: 'RERA',
    image: IMG('photo-1512917774080-9991f1c4c750'),
    highlights: ['Premium gated', 'Underground cables', 'Avenue trees'],
  },
  {
    id: 'PG-ERD-001',
    title: 'Loom City Plots',
    location: 'Erode',
    area: 'Perundurai Road',
    sqft: 1150,
    pricePerSqft: 2200,
    facing: 'South',
    status: 'available',
    approval: 'DTCP',
    image: IMG('photo-1502672260266-1c1ef2d93688'),
    highlights: ['Highway facing', 'Commercial potential', 'Loan ready'],
  },
  {
    id: 'PG-HSR-001',
    title: 'Hosur Tech Valley',
    location: 'Hosur',
    area: 'Sipcot Phase II',
    sqft: 3600,
    pricePerSqft: 4100,
    facing: 'North-East',
    status: 'available',
    approval: 'RERA',
    image: IMG('photo-1613977257363-707ba9348227'),
    highlights: ['Near Bengaluru', 'Industrial belt', 'Villa plot'],
  },
]

export const PLOTS = raw.map((p) => {
  const totalPrice = p.sqft * p.pricePerSqft
  return {
    ...p,
    sizeCategory: categoryForArea(p.sqft),
    totalPrice,
    priceLabel: formatINR(totalPrice),
  }
})

export function formatINR(amount) {
  if (amount >= 10000000)
    return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
  return `₹${amount.toLocaleString('en-IN')}`
}
