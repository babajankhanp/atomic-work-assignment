// pages/api/workspaces/index.js
export default function handler(req, res) {
  const workspacesInBangalore = [
    { id: 1, name: 'WeWork Galaxy', location: 'Residency Road', facilities: ['WiFi', 'Meeting Rooms', 'Cafeteria'] },
    { id: 2, name: 'Indiqube Alpha', location: 'Koramangala', facilities: ['WiFi', 'Conference Rooms', 'Parking'] },
    { id: 3, name: '91springboard', location: 'MG Road', facilities: ['WiFi', 'Meeting Rooms', 'High-Speed Internet'] },
    { id: 4, name: 'CoWrks', location: 'Indiranagar', facilities: ['WiFi', 'Conference Rooms', 'Cafeteria'] },
    { id: 5, name: 'Regus', location: 'UB City', facilities: ['WiFi', 'Private Offices', 'Reception Services'] },
    { id: 6, name: 'Innov8', location: 'Koramangala', facilities: ['WiFi', 'Meeting Rooms', 'Community Events'] },
    { id: 7, name: 'Workafella', location: 'Outer Ring Road', facilities: ['WiFi', 'Parking', 'Cafeteria'] },
    { id: 8, name: 'BHIVE', location: 'HSR Layout', facilities: ['WiFi', 'Conference Rooms', 'Cafeteria'] },
    { id: 9, name: 'Awfis', location: 'Church Street', facilities: ['WiFi', 'Meeting Rooms', 'Tea/Coffee'] },
    { id: 10, name: 'GoodWorks Cowork', location: 'Whitefield', facilities: ['WiFi', 'Private Cabins', 'Conference Rooms'] },
  ];

  const { search } = req.query;

  if (search) {
    const filteredWorkspaces = workspacesInBangalore.filter(workspace =>
      workspace.name.toLowerCase().includes(search.toLowerCase()) ||
      workspace.location.toLowerCase().includes(search.toLowerCase())
    );

    res.status(200).json(filteredWorkspaces);
  } else {
    res.status(200).json(workspacesInBangalore);
  }
}



