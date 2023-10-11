import { PrincipalBtn } from '@/components/atoms';

const BtnsBox = ({ btnsList, width = '1100px', justify = 'center' }) => {
  const divStyle = {
    width: width,
    display: 'flex',
    justifyContent: justify,
    margin: '0 auto'
  };
  return (
    <div style={divStyle}>
      {btnsList.map((elm, index) => (
        <PrincipalBtn key={index} {...{ data: elm }} />
      ))}
    </div>
  );
};

export default BtnsBox;
