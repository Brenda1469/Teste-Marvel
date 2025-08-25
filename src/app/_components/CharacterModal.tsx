import React from 'react';
import styled from 'styled-components';

interface Character {
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

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}


const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  border: 2px solid #ec1d24;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ec1d24;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background: #ff4040;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const CharacterName = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
  text-align: center;
`;

const CharacterDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: #ec1d24;
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const List = styled.ul`
  color: #ccc;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  line-height: 1.4;
`;

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  isOpen,
  onClose
}) => {
  if (!character) return null;

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <CharacterImage
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          onError={(e) => {
            
            e.currentTarget.src = '/placeholder-character.jpg';
          }}
        />
        
        <CharacterName>{character.name}</CharacterName>
        
        {character.description && (
          <>
            <SectionTitle>Descrição</SectionTitle>
            <CharacterDescription>
              {character.description || 'Sem descrição disponível.'}
            </CharacterDescription>
          </>
        )}

        {character.stories.items.length > 0 && (
          <>
            <SectionTitle>Histórias ({character.stories.items.length})</SectionTitle>
            <List>
              {character.stories.items.slice(0, 10).map((story, index) => (
                <ListItem key={`${character.id}-story-${index}`}>
                  {story.name}
                </ListItem>
              ))}
              {character.stories.items.length > 10 && (
                <ListItem>... e mais {character.stories.items.length - 10}</ListItem>
              )}
            </List>
          </>
        )}

        {character.comics?.items?.length > 0 && (
          <>
            <SectionTitle>Quadrinhos ({character.comics.items.length})</SectionTitle>
            <List>
              {character.comics.items.slice(0, 5).map((comic, index) => (
                <ListItem key={`${character.id}-comic-${index}`}>
                  {comic.name}
                </ListItem>
              ))}
              {character.comics.items.length > 5 && (
                <ListItem>... e mais {character.comics.items.length - 5}</ListItem>
              )}
            </List>
          </>
        )}

        {character.series?.items?.length > 0 && (
          <>
            <SectionTitle>Séries ({character.series.items.length})</SectionTitle>
            <List>
              {character.series.items.slice(0, 5).map((series, index) => (
                <ListItem key={`${character.id}-series-${index}`}>
                  {series.name}
                </ListItem>
              ))}
              {character.series.items.length > 5 && (
                <ListItem>... e mais {character.series.items.length - 5}</ListItem>
              )}
            </List>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};