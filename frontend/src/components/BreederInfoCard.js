import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        display: 'flex'
        // textAlign: 'center',
    },
    avatar: {
        margin: '10px 10px 10px 10px',
        display: 'flex',
        width: 240,
        height: 200,
    },
    card_content: {
        display: 'flex',
        // justify: 'center',
    },

    tags: {
        textDecoration: 'underline',
    }
};

export class BreederInfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false,
        };

        this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
    }

    handleReadMoreClick() {
        this.setState({
            readMore: !this.state.readMore
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <ListItem alignItems="flex-start">
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.avatar}
                        title="Breeder Image"
                        image={this.props.info.background_photo}
                    // <Avatar variant='square' alt="Remy Sharp" src="https://topics.amcham.com.tw/wp-content/uploads/2016/07/biodiversity6-1.jpg" />
                    />
                    <div className={classes.card_content}>
                        <CardContent>
                            <Typography component="h5" variant="h5">
                                {this.props.info.dog_breed_type}
                            </Typography>

                            <Typography variant="body1" color="textSecondary" className={classes.tags}>
                                {/* // Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...  */}
                                {this.props.info.address}
                            </Typography>

                            <Typography variant="h6" color="h6">
                                {/* // Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...  */}
                                {this.props.info.overview}
                            </Typography>

                            <Typography>
                                <a onClick={this.handleReadMoreClick}>Read more</a>
                            </Typography>

                            <Collapse in={this.state.readMore} timeout="auto" unmountOnExit>
                                <Typography paragraph="true">
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                            </Collapse>
                        </CardContent>

                    </div>

                </Card>
            </ListItem>
            //   <Divider variant="inset" component="li" />
        );

    }
}

export default withStyles(styles)(BreederInfoCard);