describe('failing test', () => {
  const Fixture = () =>
    <div disabled>
      <i>
        <b />
      </i>
    </div>;

  it('fails toHaveProp', () => {
    expect(shallow(<Fixture />)).toHaveProp('enabled');
  });

  it('fails NOT toHaveProp', () => {
    expect(shallow(<Fixture disabled />)).not.toHaveProp('disabled', true);
  });

  it('fails toHaveProp undefined value', () => {
    expect(shallow(<Fixture disabled="value" />)).toHaveProp(
      'enabled',
      undefined
    );
  });
});
