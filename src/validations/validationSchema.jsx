import * as yup from "yup"

const validationsForm = {

        // jobPosition: yup
        //         .string()
        //         .required("Pozisyon girilmeli.."),
        // jobDescription: yup
        //         .string()
        //         .required("İş tanımı doldurulması zorunlu alan "),
        // city: yup
        //         .string()
        //         .required("Şehir seçimi zorunlu"),
        // minSalary: yup
        //         .number("Hey sayı gir"),
        // maxSalary: yup
        //         .number("Hey sayı gir"),
        // positionCount: yup
        //         .number()
        //         .min(1, "en az 1 adet açık pozisyon girmelisiniz"),
        // closingDate: yup
        //         .date()
        //         .required("İlanın kapatılacağı tarih girilmeli")

        name: yup.string().required("Required"),
        surname: yup.string().required("Required"),
        email: yup
                .string()
                .email("Enter a valid email")
                .required("Email is required"),
        course: yup.string().required("Select your course category"),
        password: yup
                .string()
                .min(8, "Password must contain at least 8 characters")
                .required("Enter your password"),
        confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Password does not match")
                .required("Confirm your password"),
        website: yup
                .string()
                .url()
                .required("Website is required")

};

export default validationsForm;