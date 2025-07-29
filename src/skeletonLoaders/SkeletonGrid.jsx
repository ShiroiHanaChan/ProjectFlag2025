import React from 'react';

function SkeletonGrid() {
    return (
        <>
            <section className="skeleton-grid">
                <section className="skeleton-section">
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                </section>

                <section className="skeleton-section">
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                    <section></section>
                </section>
            </section>
        </>
    );
}

export default SkeletonGrid;