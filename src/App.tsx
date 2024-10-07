import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingForm from './components/BookingForm';
// Import other components as needed

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <BookingForm />
          {/* Add other components and routes as needed */}
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;