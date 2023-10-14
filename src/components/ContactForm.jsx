import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ContactForm() {
    return (
        <>
        {/* Basic React Bootstrap form with disabled property so you can't fill them in */}
            <Form>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    disabled
                    readOnly
                />
                <br />
                <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    disabled
                    readOnly
                />
                <br />
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    aria-label="Message"
                    disabled
                    readOnly
                />
                <Button variant="primary" disabled className="mt-3">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default ContactForm;