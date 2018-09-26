describe('failing test', () => {
  const Fixture = () => <div />;

  it('fails toHaveDisplayName', () => {
    expect(mount(<Fixture />)).toHaveDisplayName('span');
  });

  it('fails NOT toHaveDisplayName', () => {
    expect(shallow(<Fixture />)).not.toHaveDisplayName('div');
  });
});
