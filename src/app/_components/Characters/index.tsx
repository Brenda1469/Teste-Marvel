"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import { 
  Container, 
  CardList, 
  Card, 
  SearchContainer, 
  SearchInput, 
  ClearButton,
  LoadingText,
  NoResultsText,
  LoadMoreIndicator
} from './styles';
import { FiSearch } from 'react-icons/fi';
import { CharacterModal } from '../CharacterModal';

interface ResponseData {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  stories: {
    items: {
      name: string;
      type: string;
    }[];
  };
  comics: {
    items: {
      name: string;
    }[];
  };
  series: {
    items: {
      name: string;
    }[];
  };
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<ResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<ResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const limit = 20;

  const generateUniqueKey = (character: ResponseData, index: number) => {
    return `${character.id}-${index}-${character.name}-${offset}`;
  };

  useEffect(() => {
    loadCharacters(0);
  }, []);

  const loadCharacters = async (newOffset: number, search: string = "") => {
    if (search) {
      setIsSearching(true);
    } else if (newOffset > 0) {
      setIsLoadingMore(true);
    }

    try {
      // ✅ CHAMADA CORRETA PARA API ROUTE
      const response = await fetch(
        `/api/characters?limit=${limit}&offset=${newOffset}${search ? `&search=${search}` : ''}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data = await response.json();
      const newCharacters = data.data.results;
      
      if (search) {
        setCharacters(newCharacters);
      } else {
        setCharacters(prev => [...prev, ...newCharacters]);
      }
      
      setOffset(newOffset + newCharacters.length);
      setHasMore(newCharacters.length === limit);
      
    } catch (err) {
      console.error('Erro ao carregar personagens:', err);
      setHasMore(false);
    } finally {
      setIsSearching(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (isSearching || isLoadingMore || !hasMore || searchTerm) return;

    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadCharacters(offset);
      }
    }, observerOptions);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isSearching, isLoadingMore, hasMore, offset, searchTerm]);

  const searchCharacters = useCallback(async (term: string) => {
    if (term.trim() === "") {
      setCharacters([]);
      setOffset(0);
      setHasMore(true);
      loadCharacters(0);
      return;
    }

    setIsSearching(true);
    await loadCharacters(0, term);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchCharacters(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, searchCharacters]);

  const handleCharacterClick = (character: ResponseData) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCharacters([]);
    setOffset(0);
    setHasMore(true);
    loadCharacters(0);
  };

  return (
    <Container>
      <SearchContainer>
        <FiSearch size={20} color="#ec1d24" />
        <SearchInput
          type="text"
          placeholder="Pesquisar personagens..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <ClearButton onClick={clearSearch}>
            ×
          </ClearButton>
        )}
      </SearchContainer>

      {isSearching && (
        <LoadingText>
          Pesquisando...
        </LoadingText>
      )}

      <CardList>
        {characters.map((character, index) => (
          <Card 
            key={generateUniqueKey(character, index)} 
            thumbnail={character.thumbnail}
            onClick={() => handleCharacterClick(character)}
          >
            <div id="img" />
            <h2>{character.name}</h2>
            <p>{character.description || 'Sem descrição disponível.'}</p>

            {character.stories.items.length > 0 && (
              <div>
                <h3>Histórias:</h3>
                <ul>
                  {character.stories.items.slice(0, 3).map((story, storyIndex) => (
                    <li key={`${character.id}-story-${storyIndex}-${index}`}>
                      {story.name}
                    </li>
                  ))}
                  {character.stories.items.length > 3 && (
                    <li>... e mais {character.stories.items.length - 3}</li>
                  )}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </CardList>

      {hasMore && !isSearching && !searchTerm && (
        <div ref={loadMoreRef} style={{ height: '50px', width: '100%' }}>
          {isLoadingMore && (
            <LoadMoreIndicator>
              Carregando mais personagens...
            </LoadMoreIndicator>
          )}
        </div>
      )}

      {!hasMore && characters.length > 0 && (
        <LoadingText>
          Todos os personagens foram carregados!
        </LoadingText>
      )}

      {characters.length === 0 && !isSearching && (
        <NoResultsText>
          Nenhum personagem encontrado.
        </NoResultsText>
      )}

      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Characters;