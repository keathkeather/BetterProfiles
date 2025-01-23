'use client'
import Link from "next/link";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchUserByName } from "../util/search";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ""; // Set a fallback to empty string if q is undefined
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchUserByName({ _USERNAME: query });
        console.log(response)
        if (response.success) {
          setResults(response.data.users); // Access the users array from the response
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("An error occurred while searching for users.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results for "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((user) => (
              <Card key={user._USER_ID} className="p-4">
                <div className="mb-4">
                  <h5 className="font-bold text-xl">{user._USERNAME}</h5>
                  <p className="text-gray-600">{user._EMAIL}</p>
                  <p className="text-gray-600">Created At: {new Date(user._CREATED_AT).toLocaleDateString()}</p>
                </div>
                <Link href={`/dashboard?userId=${user._USER_ID}`} passHref>
                  <Button label="View Dashboard" icon="pi pi-arrow-right" className="p-button-text p-button-sm" style={{color:'#FA7422'}}/>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}