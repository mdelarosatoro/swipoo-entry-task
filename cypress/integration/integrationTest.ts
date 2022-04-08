describe('Select all fields with valid choices', () => {
    it('Should display the selected model information', () => {
        cy.visit('http://localhost:3000');
        cy.get('#brand').select('Alfa Romeo');
        cy.get('#initial-enrollment-date').type('2020-05-06');
        cy.get('#fuel').select('G');
        cy.get('.loading').should('exist');
        cy.get('#model').select('4C 1.7 Tbi TCT / 1.75 6V 240');
        cy.get('.details__cell--value')
            .eq(0)
            .should(($brand) => {
                expect($brand).to.contain('Alfa Romeo');
            });
        cy.get('.details__cell--value')
            .eq(1)
            .should(($model) => {
                expect($model).to.contain('4C 1.7 Tbi TCT / 1.75 6V 240');
            });
        cy.get('.details__cell--value')
            .eq(2)
            .should(($cc) => {
                expect($cc).to.contain('1742');
            });
        cy.get('.details__cell--value')
            .eq(3)
            .should(($cylinders) => {
                expect($cylinders).to.contain('4');
            });
        cy.get('.details__cell--value')
            .eq(4)
            .should(($fuel) => {
                expect($fuel).to.contain('G');
            });
        cy.get('.details__cell--value')
            .eq(5)
            .should(($kw) => {
                expect($kw).to.contain('177');
            });
        cy.get('.details__cell--value')
            .eq(6)
            .should(($cvf) => {
                expect($cvf).to.contain('12');
                expect($cvf).to.contain('26');
            });
        cy.get('.details__cell--value')
            .eq(7)
            .should(($cv) => {
                expect($cv).to.contain('241');
            });
        cy.get('.valuation__cell--value')
            .eq(0)
            .should(($valuation) => {
                expect($valuation).to.contain('42,100');
            });
        cy.get('.valuation__cell--value')
            .eq(1)
            .should(($valuation) => {
                expect($valuation).to.contain('37,890');
            });
        cy.get('.valuation__cell--value')
            .eq(2)
            .should(($valuation) => {
                expect($valuation).to.contain('34,101');
            });
    });
});
describe('Select all fields with valid choices, but no cars match', () => {
    it('Should display a message saying no models were found', () => {
        cy.visit('http://localhost:3000');
        cy.get('#brand').select('Alfa Romeo');
        cy.get('#initial-enrollment-date').type('2020-05-06');
        cy.get('#fuel').select('GyE');
        cy.get('.loading').should('exist');
        cy.contains('No se encontró ningún modelo.').should('exist');
    });
});
describe('Select all fields with valid choices, but with no network', () => {
    it('Should display an error while fetching message', () => {
        cy.visit('http://localhost:3000');
        cy.intercept('GET', '**', { statusCode: 404 });
        cy.get('#brand').select('Alfa Romeo');
        cy.get('#initial-enrollment-date').type('2020-05-06');
        cy.get('#fuel').select('GyE');
        cy.contains('Error while fetching').should('exist');
    });
});

export {};
