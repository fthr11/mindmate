import { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm MindMate, your mental awareness companion. How can I support you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const groqRef = useRef(null);

    // Initialize Groq client
    useEffect(() => {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        
        if (apiKey) {
            groqRef.current = new Groq({
                apiKey: apiKey,
                dangerouslyAllowBrowser: true
            });
        } else {
            console.error('API key not found. Please add to .env file');
        }
    }, []);

    // Convert AI text into formatted JSX
    const formatBotMessage = (text: string, color) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        return lines.map((line, index) => {
            // Bullet points (e.g. "- Something")
            if (line.trim().startsWith('- ')) {
                return (
                    <li key={index} className="ml-4 list-disc text-sm leading-relaxed text-gray-700">
                        {line.replace('- ', '').trim()}
                    </li>
                );
            }
            // Numbered points (e.g. "1. Something")
            if (/^\d+\.\s/.test(line)) {
                return (
                    <li key={index} className="ml-4 list-decimal text-sm leading-relaxed text-gray-700">
                        {line.replace(/^\d+\.\s/, '').trim()}
                    </li>
                );
            }
            // Normal paragraph
            return (
                <p key={index} className={`mb-2 text-sm leading-relaxed ${color}`}>
                    {line}
                </p>
            );
        });
    };

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const getGroqChatCompletion = async (userMessage) => {
        if (!groqRef.current) {
            throw new Error('Groq client not initialized');
        }

        return groqRef.current.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are MindMate, a compassionate AI companion focused on mental health awareness and emotional support. Respond with empathy, understanding, and helpful guidance. Keep responses concise, supportive, and encouraging."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user'
        };
        
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Get AI response
            const chatCompletion = await getGroqChatCompletion(currentInput);
            const aiResponse = chatCompletion.choices[0]?.message?.content || "I'm here to listen.";

            // Add bot message
            const botMessage = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'bot'
            };
            
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            
            // Add error message
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting right now. Please check your API key and try again.",
                sender: 'bot'
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            {/* Header */}
            <div className="bg-white rounded-t-lg shadow-md p-4 border-b border-purple-200">
                <a href="/" className="text-primary font-semibold hover:underline">Home</a>
                <h1 className="text-2xl font-bold text-primary text-center">MindMate Chat</h1>
                <p className="text-sm text-gray-600 text-center mt-1">Your AI companion for mental awareness and support</p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((msg) => (
                    <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >   
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                msg.sender === 'user'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}
                        >
                            {formatBotMessage(msg.text, msg.sender === 'user' ? 'text-white bg-primary' : 'text-gray-800')}
                        </div>
                </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-200">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-b-lg shadow-md p-4 border-t border-purple-200 flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share your thoughts..."
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>

            {/* Footer Note */}
            <div className="text-xs text-gray-500 text-center mt-2">
                MindMate is here to listen and provide general mental health awareness. For professional help, consult a therapist.
            </div>
        </div>
    );
};

export default ChatBot;