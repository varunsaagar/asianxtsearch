import React from 'react';
import SearchBar from '../components/SearchBar';
import SuggestedQueries from '../components/SuggestedQueries';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-8 py-16">
      <h1 className="text-white text-5xl font-medium mb-12">
        What do you want to know?
      </h1>
      <SearchBar />
      <SuggestedQueries />
    </main>
  );
}