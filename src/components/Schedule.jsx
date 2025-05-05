import React, { useState } from 'react';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState(0);

  const dates = [
    { day: 'Mon', date: '5 May' },
    { day: 'Tue', date: '6 May' },
    { day: 'Wed', date: '7 May' },
    { day: 'Thu', date: '8 May' },
    { day: 'Fri', date: '9 May' }
  ];

  // Sample conference schedule data for each day
  const schedules = {
    0: [
      {
        time: '08:00 - 09:00',
        title: 'Registration & Breakfast',
        location: 'Grand Ballroom Foyer',
        description: 'Check-in and morning refreshments'
      },
      {
        time: '09:00 - 10:30',
        title: 'Opening Keynote',
        location: 'Grand Ballroom',
        description: 'The Future of Technology in Business',
        speaker: 'Dr. Sarah Johnson, Tech Innovations Inc.'
      }
    ],
    1: [
      {
        time: '09:00 - 10:30',
        title: 'Panel Discussion: AI Trends',
        location: 'Room A',
        description: 'Experts discuss the latest in artificial intelligence',
        speakers: [
          'Prof. Michael Chen, MIT',
          'Dr. Lisa Park, Google AI',
          'James Wilson, OpenAI'
        ]
      },
      {
        time: '11:00 - 12:30',
        title: 'Workshop: Cloud Computing',
        location: 'Room B',
        description: 'Hands-on session with AWS and Azure'
      }
    ],
    2: [
      {
        time: '10:00 - 11:30',
        title: 'Data Privacy Regulations',
        location: 'Room C',
        description: 'Understanding GDPR and new privacy laws',
        speaker: 'Emma Davis, Privacy Consultant'
      }
    ],
    3: [
      {
        time: '09:30 - 11:00',
        title: 'Networking Session',
        location: 'Exhibition Hall',
        description: 'Meet with industry peers and sponsors'
      }
    ],
    4: [
      {
        time: '14:00 - 15:30',
        title: 'Closing Ceremony',
        location: 'Grand Ballroom',
        description: 'Awards and conference wrap-up',
        speaker: 'Conference Chair'
      }
    ]
  };

  // Calculate the maximum number of sessions across all days
  const maxSessions = Math.max(...Object.values(schedules).map(day => day.length));

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl text-center uppercase font-extrabold tracking-tight text-gray-700 sm:text-4xl mb-12">
          Schedule
        </h2>
        
        {/* Date Tabs */}
        <div className="flex border-b border-gray-200">
          {dates.map((item, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-center focus:outline-none flex-1 hover:cursor-pointer transition-colors duration-300 ${
                activeTab === index
                  ? 'border-b-3 border-green-600 text-green-600 font-bold'
                  : 'text-gray-500 hover:text-green-600'
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div className="text-md">{item.day}</div>
              <div className="text-md">{item.date}</div>
            </button>
          ))}
        </div>

        {/* Schedule Content with Fixed Height */}
        <div 
          className="py-6 transition-all duration-300 ease-in-out"
          style={{
            minHeight: `${maxSessions * 150 + 100}px`, // Base height on max sessions
            height: 'auto',
            overflow: 'hidden'
          }}
        >
          <h2 className="text-xl font-bold mb-6">
            {dates[activeTab].day}, {dates[activeTab].date} Schedule
          </h2>

          <div className="space-y-8">
            {schedules[activeTab].length > 0 ? (
              schedules[activeTab].map((session, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-6 shadow-md transition-opacity duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-full md:w-1/4">
                      <p className="text-sm font-semibold text-green-600">{session.time}</p>
                      <p className="text-gray-500 text-md mt-1">{session.location}</p>
                    </div>
                    <div className="w-full md:w-3/4">
                      <h3 className="text-md font-bold mb-2">{session.title}</h3>
                      <p className="text-gray-700 mb-3 text-sm">{session.description}</p>
                      
                      {session.speaker && (
                        <p className="text-sm text-gray-600">
                          <span>Speaker:</span> {session.speaker}
                        </p>
                      )}

                      {session.speakers && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">Speakers:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {session.speakers.map((speaker, i) => (
                              <li key={i}>{speaker}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div 
                className="text-gray-500 text-center py-8 transition-opacity duration-300"
                style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                No sessions scheduled for this day
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}