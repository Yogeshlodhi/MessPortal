interface ISignupProps {
  userType: string;
}

const Signup = ({ userType }: ISignupProps) => {
  console.log(userType);

  return <div>signup</div>;
};

export default Signup;