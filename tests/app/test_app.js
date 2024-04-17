function testMyComponent() {
    const { myComponent } = require('../src/app/myComponent');

    const defaultRender = myComponent();
    console.assert(defaultRender === 'default render', 'Failed: myComponent did not render correctly with default props');

    let clickHandled = false;
    const mockOnClick = () => { clickHandled = true; };
    const clickRender = myComponent({ onClick: mockOnClick });
    console.assert(clickHandled, 'Failed: myComponent did not handle onClick event correctly');
}

testMyComponent();