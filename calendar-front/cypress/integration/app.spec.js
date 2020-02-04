describe('Blogilista ', function () {

  // beforeEach(function () {
  //   cy.request('POST', 'http://localhost:3000/api/tests/reset')
  //   const user = {
  //     name: 'admin',
  //     username: 'admin',
  //     password: 'secret'
  //   }
  //   cy.request('POST', 'http://localhost:3000/api/users/', user)
  //   // cy.visit('http://localhost:3000/login')
  // })


  // it('user can register and login to the app', function () {
  //   cy.visit('http://localhost:3000/register')
  //   cy.contains('Register')
  //   cy.get('#username').type('admin')
  //   cy.get('#password').type('secret')
  //   cy.get('[data-cy=rPassword] > #password').type("secret")
  //   cy.get('[data-cy=register]').click()
  //   cy.get('[data-cy="Sign up"]').click()
  //   cy.get('#username').type('admin')
  //   cy.get('#password').type('secret')
  //   cy.get('[data-cy=login]').click()
  // })

  it('user can log in ', function () {
    cy.visit('http://localhost:3000/login')
    cy.contains('Log-in to your account')
    cy.get('#username').type('admin')
    cy.get('#password').type('secret')
    cy.get('[data-cy=login]').click()
    cy.contains('<admin> logged in')
    cy.get('[data-cy=ballrooms]').click()
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ui').click()
    cy.get('[data-cy=ballroom-title] > input').type("Pavi")
    cy.get('[data-cy=ballroom-url] > input').type("http://pavi.fi")
    cy.get('[data-cy=togglable-add-ballroom]').click()
    cy.get('[data-cy=cancel]').click()
    cy.get('[data-cy=logout]').click()
  })


  it('user can log in, add a ballroom and logout', function () {
    cy.visit('http://localhost:3000/login')
    cy.contains('Log-in to your account')
    cy.get('#username').type('admin')
    cy.get('#password').type('secret')
    cy.get('[data-cy=login]').click()
    cy.contains('<admin> logged in')
    cy.get('[data-cy=ballrooms]').click()
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ui').click()
    cy.get('[data-cy=ballroom-title] > input').type("Pavi")
    cy.get('[data-cy=ballroom-url] > input').type("http://pavi.fi")
    cy.get('[data-cy=togglable-add-ballroom]').click()
    cy.get('[data-cy=cancel]').click()
    cy.get('[data-cy=logout]').click()
  })

  it('user can log in, add a calendar mark and logout', function () {
    cy.visit('http://localhost:3000/login')
    cy.contains('Log-in to your account')
    cy.get('#username').type('admin')
    cy.get('#password').type('secret')
    cy.get('[data-cy=login]').click()
    cy.contains('<admin> logged in')
    cy.get('[data-cy=calendars]').click()
    cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ui').click()
    cy.get('[data-cy=calendar-title] > input').type("Summercamp")
    cy.get('[data-cy=calendar-url] > input').type("https://www.tanssikurssit.fi/tapahtuma/valasrannan-tanssileiri/")
    cy.get('.DayPickerInput > input').type("2020-05-21")
    cy.get('[data-cy=calendars]').click()
    cy.get('[data-cy=togglable-add-calendar]').click()
    cy.get('[data-cy=cancel]').click()
    cy.get('[data-cy=logout]').click()
  })

})