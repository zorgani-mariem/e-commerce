 import LogoImg from "../../assets/common/logo1.png"
import { BodyOne, Caption, CustomLink, Title } from "./CustomComponents"
 export const Footer = () => {
   return (
    <footer className="py-14">
        <div className="container grid-cols-1 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
                <img src={LogoImg} alt="" className="h-16"/>
                <div className="flex flex-col gap-2 mt-5">
                    <Caption>Address : Tunis,Tunisie  </Caption>
                    <Caption>Email : mariem.zorgani@esprit.tn </Caption>
                    <Caption>Call : +21626760560 </Caption>
                </div>
                <br/>
                <BodyOne>Subscribe To Our Newsletter</BodyOne>
                <input type="text" className="p-3 w-white-100 border-gray-300 rounded-md outline-none"  placeholder="Enter your email address "></input>
            </div>
            <div>
                <Title level={5}> Our Stores</Title>
                <div className="flex flex-col gap-4">
                    <CustomLink>Normal</CustomLink>
                    <CustomLink>Shop With Sidebar</CustomLink>
                    <CustomLink>Shop With category</CustomLink>
                    <CustomLink>Shop FiltersTop Bar</CustomLink>
                    <CustomLink>Shop Wide </CustomLink>
                    <CustomLink> My Account</CustomLink>
                </div>
            </div>

            <div>
                <Title level={5}>Usefull Links</Title>
                <div className="flex flex-col gap-4">
                    <CustomLink>Normal</CustomLink>
                    <CustomLink>Shop With Sidebar</CustomLink>
                    <CustomLink>Shop With category</CustomLink>
                    <CustomLink>Shop FiltersTop Bar</CustomLink>
                    <CustomLink>Shop Wide </CustomLink>
                    <CustomLink> My Account </CustomLink>
                </div>
            </div>

            <div>
                <Title level={5}> Our Blog</Title>
                <div className="flex flex-col gap-4">
                    <CustomLink>Normal</CustomLink>
                    <CustomLink>Shop With Sidebar</CustomLink>
                    <CustomLink>Shop With category</CustomLink>
                    <CustomLink>Shop FiltersTop Bar</CustomLink>
                    <CustomLink>Shop Wide </CustomLink>
                    <CustomLink> My  Account</CustomLink>
                </div>
            </div>
        </div>  
    </footer>  
    )
 }
 
 export default Footer