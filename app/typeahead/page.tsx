'use client'
import { useEffect, useRef, useState } from "react";

const Typeahead = ({
    query,
    onQueryChange,
    suggestions,
    onSuggestionSelect,
    selectedSuggestions,
    isLoading
}: any) => {
    const [index, setIndex] = useState(-1);
    const refs=useRef(new Array(suggestions.length).fill(null));

    const handleKeyDown = (e: any) => {
        const key = e.key;
        switch (key) {
            case 'ArrowDown':
                if (index < suggestions.length-1) {
                    setIndex((prev) => prev + 1);
                }
                break;
            case 'ArrowUp':
                if (index > 0) {
                    setIndex((prev) => prev - 1);
                }
                break;

        }

    }
    useEffect(() => {
        refs?.current[index]?.scrollIntoView({
            block:'nearest'
        });
    }, [index])
   

    return (
        <div className="w-64">
            <div className="border border-gray-300 rounded-md">
                <input id="typeahead" className="w-64" type="text" value={query} onChange={onQueryChange} onKeyDown={handleKeyDown} />
            </div>
            {
                isLoading && <div className="mt-2 text-gray-500">Loading...</div>
            }
            {
                !isLoading && suggestions.length === 0 && query && <div className="mt-2 text-gray-500">No suggestions found</div>
            }
            {
                selectedSuggestions.length > 0 && <div className="mt-2">Selected: {selectedSuggestions.map((s: any) => s.firstName).join(', ')}</div>
            }
            {
                !isLoading && suggestions.length > 0 &&
                <div className="h-[300px] overflow-y-auto border border-gray-300 rounded-md mt-2">
                    {suggestions?.map((suggestion: any, i: any) => {
                        const isSelected = selectedSuggestions.some((s: any) => s.id === suggestion.id);
                        return (
                            <div className="h-10 w-full" key={suggestion.id} ref={(el)=>{refs.current[i]=el}} onClick={() => onSuggestionSelect(suggestion)} style={{ backgroundColor: index == i ? 'blue' : isSelected ? 'grey' : 'white' }}>
                                {suggestion.firstName}
                            </div>
                        )
                    })}
                </div>
            }

        </div>
    )
}

const Wrapper = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSuggestions, setSelectedSuggestions] = useState<any[]>([]);

    const handleQueryChange = (e: any) => {
        setQuery(e.target.value);
    }

    const fetchUsers = async (signal: AbortSignal) => {
        try {
            const res = await fetch(`https://dummyjson.com/users/search?q=${query}`, { signal });
            const data = await res.json();
            setIsLoading(false);
            setSuggestions(data?.users);
        }
        catch (err) {
            setIsLoading(false);
        }
    }

    const handleSuggestionSelect = (suggestion: any) => {
        const alreadySelected = selectedSuggestions?.some(((s: any) => s.id === suggestion.id));
        if (alreadySelected) {
            setSelectedSuggestions((prev) => prev.filter((s: any) => s.id !== suggestion.id));
        }
        else {
            setSelectedSuggestions((prev: any) => [...prev, suggestion]);
        }
    }

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        const abortController = new AbortController();
        const timer = setTimeout(() => {
            setIsLoading(true);
            fetchUsers(abortController.signal);
        }, 300)
        return () => {
            clearTimeout(timer);
            abortController.abort();
        }
    }, [query])

    return (
        <div className="flex items-center justify-center mt-50">
            <Typeahead query={query} onQueryChange={handleQueryChange} suggestions={suggestions} onSuggestionSelect={handleSuggestionSelect} selectedSuggestions={selectedSuggestions} isLoading={isLoading} />
        </div>
    )

}

export default Wrapper;