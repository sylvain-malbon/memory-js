import React from 'react';

function DifficultySelector({ value, onChange }) {
    return (
        <div className="difficulty-selector">
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="beginner"
                    checked={value === 'beginner'}
                    onChange={() => onChange('beginner')}
                />
                Débutant
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="intermediate"
                    checked={value === 'intermediate'}
                    onChange={() => onChange('intermediate')}
                />
                Intermédiaire
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="advanced"
                    checked={value === 'advanced'}
                    onChange={() => onChange('advanced')}
                />
                Avancé
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="expert"
                    checked={value === 'expert'}
                    onChange={() => onChange('expert')}
                />
                Expert
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="master"
                    checked={value === 'master'}
                    onChange={() => onChange('master')}
                />
                Maître
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="legend"
                    checked={value === 'legend'}
                    onChange={() => onChange('legend')}
                />
                Légende
            </label>
        </div>
    );
}

export default DifficultySelector;
