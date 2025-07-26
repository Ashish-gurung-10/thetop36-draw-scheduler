import React, { useState, useEffect } from 'react';

// --- Main App Component ---
// This acts as the page that would host your winner feed.
export default function DailyDrawScheduler () {
    // This data would come from your server as props to the page component.
    const pageData = {
        title: "DAILY DRAW WINNERS",
        description: "Two lucky winners are drawn every day. Check back to see if you've won!",
    };

    return (
        <div className="bg-[#F1F5FB] font-sans min-h-full">
            {/* 2. Main Content Area */}
            <main className="container mx-auto p-4 md:p-8 flex justify-center">
                <div className="flex flex-col items-center justify-center py-12 text-center w-full max-w-2xl">
                    <h1 className="text-4xl font-black text-[#111D5E] mb-4">{pageData.title}</h1>
                    <p className="text-gray-600 mb-8">{pageData.description}</p>
                    
                    {/* 3. The Winner Feed Component */}
                    <WinnerFeed />
                </div>
            </main>
        </div>
    );
}

// --- The WinnerFeed Component ---
function WinnerFeed () {
    // In a real app, this list would come from a database.
    const mockParticipants = [
        'user_alpha_123', 'user_beta_456', 'user_gamma_789', 'user_delta_101',
        'user_epsilon_112', 'user_zeta_131', 'user_eta_415', 'user_theta_161'
    ];

    const [winners, setWinners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to simulate the cron job that picks winners.
    const runDailyDraw = () => {
        setIsLoading(true);
        
        // Simulate network delay
        setTimeout(() => {
            // Create a copy of participants to avoid modifying the original list
            const shuffled = [...mockParticipants].sort(() => 0.5 - Math.random());
            // Select the first two as winners
            const newWinners = shuffled.slice(0, 2).map(id => ({
                userId: id,
                // Add a timestamp for when they won
                wonAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            }));

            setWinners(newWinners);
            setIsLoading(false);
        }, 1000); // 1-second delay
    };
    
    // Simulate fetching initial winners when the component loads.
    useEffect(() => {
        runDailyDraw();
    }, []);


    return (
        <div className="bg-white p-6 rounded-[8px] shadow-lg w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#111D5E]">Today's Winners</h3>
                <button 
                    onClick={runDailyDraw}
                    disabled={isLoading}
                    className="bg-[#FF7A00] text-white text-sm font-bold py-2 px-4 rounded-[8px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait"
                >
                    {isLoading ? 'Drawing...' : 'Run Draw'}
                </button>
            </div>
            
            <div className="min-h-[150px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full pt-10">
                        <div className="w-8 h-8 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : winners.length > 0 ? (
                    <ul className="space-y-3">
                        {winners.map((winner, index) => (
                            <li key={index} className="p-4 bg-[#F1F5FB] rounded-[8px] flex justify-between items-center text-left">
                                <span className="font-bold text-[#111D5E]">Winner #{index + 1}: {winner.userId}</span>
                                <span className="text-sm text-gray-500">
                                    Drawn at {winner.wonAt}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center h-full pt-10">
                        <p className="text-gray-500">No winners have been drawn yet today.</p>
                    </div>
                )}
            </div>
        </div>
    );
}