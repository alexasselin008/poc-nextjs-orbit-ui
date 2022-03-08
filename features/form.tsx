import { Field, TextInput,Checkbox,ButtonGroup,Form,Label,ErrorMessage,Button, Flex, Heading } from "@orbit-ui/components";
import Link from "next/link";
import {useFormik} from "formik";
import {SyntheticEvent} from "react"

export function OrbitForm () {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            agreeTerms: false
        },
        validate: (values) => {
            return Object.keys(values).reduce((acc, x ) => {
                const key = x as keyof typeof values
                if (!values[key]) {
                    acc[key] = `${x} is required.`;
                }

                return acc;
            }, {} as Record<keyof typeof values, string>);
        },
        onSubmit: (values, actions) => {
            setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));

                actions.setSubmitting(false);
                actions.resetForm();
            }, 10000);
        }
    });

    const getValidationState = (fieldId: keyof typeof formik.initialValues) => {
        return formik.touched[fieldId] ? (formik.errors[fieldId] ? "invalid" : "valid") : undefined;
    };
    
    return (
      <>
      <Heading>Form</Heading>
        <Form onSubmit={formik.handleSubmit}>
            <Field id="firstName" validationState={getValidationState("firstName")}>
                <Label required>First name</Label>
                <TextInput
                    onChange={(event: SyntheticEvent) => {
                        /* @ts-ignore */
                        console.log(event.target.value);
                        formik.handleChange(event);
                    }}
                    value={formik.values.firstName}
                />
                <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
            </Field>
            <Field id="lastName" validationState={getValidationState("lastName")}>
                <Label required>Last name</Label>
                <TextInput onChange={formik.handleChange} value={formik.values.lastName} />
                <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
            </Field>
            <Field id="userName" validationState={getValidationState("userName")}>
                <Label required>Username</Label>
                <TextInput onChange={formik.handleChange} value={formik.values.userName} />
                <ErrorMessage>{formik.errors.userName}</ErrorMessage>
            </Field>
            <Field id="agreeTerms" validationState={getValidationState("agreeTerms")}>
                <Checkbox onChange={formik.handleChange} checked={formik.values.agreeTerms}>
                    Agree to terms and conditions
                </Checkbox>
            </Field>
            <ButtonGroup align="end">
                <Button variant="secondary" onClick={() => formik.resetForm}>
                    Reset
                </Button>
                <Button loading={formik.isSubmitting} type="submit">
                    Submit
                </Button>
            </ButtonGroup>
        </Form>
      </>
    );
}